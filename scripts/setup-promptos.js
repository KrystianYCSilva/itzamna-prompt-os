#!/usr/bin/env node
'use strict';

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const COPY_ITEMS = [
  '.prompt-os',
  'ITZAMNA-AGENT.md',
];

const CONTEXT_TAGS = new Set(['min-context', 'complete-context']);

function parseArgs(argv) {
  const args = {
    command: null,
    target: null,
    context: null,
    force: false,
    dryRun: false,
    verbose: false,
    contextOnly: false,
    noCoreCopy: false,
  };

  if (argv.length > 0) {
    args.command = argv[0];
  }

  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--target' && i + 1 < argv.length) {
      args.target = argv[++i];
      continue;
    }
    if (a === '--context' && i + 1 < argv.length) {
      args.context = argv[++i];
      continue;
    }
    if (a === '--force') {
      args.force = true;
      continue;
    }
    if (a === '--dry-run') {
      args.dryRun = true;
      continue;
    }
    if (a === '--context-only') {
      args.contextOnly = true;
      continue;
    }
    if (a === '--no-core-copy') {
      args.noCoreCopy = true;
      continue;
    }
    if (a === '--verbose') {
      args.verbose = true;
      continue;
    }
    if (a === '-h' || a === '--help') {
      args.help = true;
      return args;
    }
  }

  return args;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/setup-promptos.js init --target <pasta> --context min-context|complete-context [--force] [--dry-run] [--verbose]',
    '',
    'Commands:',
    '  init        Copia o PromptOS core e gera a estrutura .context/ via templates',
    '',
    'Options:',
    '  --target    Pasta destino (obrigatorio)',
    '  --context   Tag do contexto: min-context | complete-context (obrigatorio)',
    '  --force     Sobrescreve arquivos se existirem',
    '  --dry-run   Mostra o que seria feito, sem copiar',
    '  --context-only  Gera apenas .context/ e MEMORY.md (nao copia .prompt-os nem ITZAMNA-AGENT.md)',
    '  --no-core-copy  Alias de --context-only',
    '  --verbose   Log detalhado',
  ].join('\n');
}

async function exists(p) {
  try {
    await fsp.access(p);
    return true;
  } catch {
    return false;
  }
}

async function listFilesRecursive(root) {
  const results = [];
  async function walk(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else {
        results.push(full);
      }
    }
  }
  await walk(root);
  return results;
}

async function copyRecursive(src, dest) {
  const stat = await fsp.stat(src);
  if (stat.isDirectory()) {
    await fsp.mkdir(dest, { recursive: true });
    const entries = await fsp.readdir(src);
    for (const entry of entries) {
      const s = path.join(src, entry);
      const d = path.join(dest, entry);
      await copyRecursive(s, d);
    }
  } else {
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    await fsp.copyFile(src, dest);
  }
}

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  return {
    date: `${yyyy}-${mm}-${dd}`,
    dateTime: `${yyyy}-${mm}-${dd} ${hh}:${min}`,
    iso: date.toISOString(),
  };
}

function renderTemplate(content, vars) {
  let out = content;
  for (const [key, value] of Object.entries(vars)) {
    out = out.split(`{${key}}`).join(value);
  }
  return out;
}

async function copyTemplateTree(templateRoot, targetRoot, vars, opts) {
  const files = await listFilesRecursive(templateRoot);
  for (const file of files) {
    const rel = path.relative(templateRoot, file);
    const dest = path.join(targetRoot, rel);
    if (opts.verbose) {
      console.log(`Gerando ${rel}...`);
    }
    if (opts.dryRun) {
      continue;
    }
    const content = await fsp.readFile(file, 'utf8');
    const rendered = renderTemplate(content, vars);
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    await fsp.writeFile(dest, rendered, 'utf8');
  }
}

async function initCommand(args) {
  if (!args.target || !args.context) {
    console.error(usage());
    process.exit(1);
  }
  if (!CONTEXT_TAGS.has(args.context)) {
    console.error('Erro: --context deve ser min-context ou complete-context.');
    process.exit(1);
  }

  const repoRoot = path.resolve(__dirname, '..');
  const targetRoot = path.resolve(process.cwd(), args.target);
  const templateRoot = path.join(repoRoot, '.prompt-os', 'templates', 'context', args.context);
  const memoryTemplate = path.join(repoRoot, '.prompt-os', 'templates', 'MEMORY.template.md');
  const skipCoreCopy = args.contextOnly || args.noCoreCopy;

  if (!(await exists(templateRoot))) {
    console.error(`Erro: template nao encontrado: ${templateRoot}`);
    process.exit(1);
  }
  if (!(await exists(memoryTemplate))) {
    console.error('Erro: MEMORY.template.md nao encontrado.');
    process.exit(1);
  }

  for (const item of COPY_ITEMS) {
    if (!skipCoreCopy) {
      const src = path.join(repoRoot, item);
      if (!(await exists(src))) {
        console.error(`Erro: item nao encontrado no repo: ${item}`);
        process.exit(1);
      }
    }
  }

  const conflicts = [];
  if (!skipCoreCopy) {
    for (const item of COPY_ITEMS) {
      const dest = path.join(targetRoot, item);
      if (await exists(dest)) conflicts.push(item);
    }
  }
  if (await exists(path.join(targetRoot, '.context'))) {
    conflicts.push('.context');
  }
  if (await exists(path.join(targetRoot, 'MEMORY.md'))) {
    conflicts.push('MEMORY.md');
  }
  if (await exists(path.join(targetRoot, '.promptos-init.json'))) {
    conflicts.push('.promptos-init.json');
  }

  if (conflicts.length > 0 && !args.force) {
    console.error('Conflitos detectados. Itens ja existem no destino:');
    for (const c of conflicts) console.error(`- ${c}`);
    console.error('Use --force para sobrescrever.');
    process.exit(1);
  }

  if (args.dryRun) {
    console.log('Dry-run: copiaria os seguintes itens:');
    if (!skipCoreCopy) {
      for (const item of COPY_ITEMS) console.log(`- ${item}`);
    } else {
      console.log('- (core copy desabilitado)');
    }
    console.log(`- .context/ (via templates: ${args.context})`);
    console.log('- MEMORY.md (via template)');
    console.log('- .promptos-init.json (metadata)');
    console.log(`Destino: ${targetRoot}`);
    process.exit(0);
  }

  await fsp.mkdir(targetRoot, { recursive: true });

  if (!skipCoreCopy) {
    for (const item of COPY_ITEMS) {
      const src = path.join(repoRoot, item);
      const dest = path.join(targetRoot, item);
      if (args.verbose) console.log(`Copiando ${item}...`);
      await copyRecursive(src, dest);
    }
  }

  const now = new Date();
  const ts = formatTimestamp(now);
  const projectName = path.basename(targetRoot);
  const templateVars = {
    PROJECT_NAME: projectName,
    PROJECT_ROOT: projectName,
    TIMESTAMP: ts.iso,
    'YYYY-MM-DD': ts.date,
    'YYYY-MM-DD HH:MM': ts.dateTime,
  };

  await copyTemplateTree(templateRoot, targetRoot, templateVars, args);

  const memoryContent = await fsp.readFile(memoryTemplate, 'utf8');
  const memoryRendered = renderTemplate(memoryContent, {
    TIMESTAMP: ts.iso,
    'YYYY-MM-DD': ts.date,
    'YYYY-MM-DD HH:MM': ts.dateTime,
    N: '0',
  });
  await fsp.writeFile(path.join(targetRoot, 'MEMORY.md'), memoryRendered, 'utf8');

  const metadata = {
    promptosVersion: '2.2.0',
    contextTag: args.context,
    initializedAt: ts.iso,
    projectName: projectName,
    coreCopied: !skipCoreCopy,
    cli: 'scripts/setup-promptos.js',
  };
  await fsp.writeFile(
    path.join(targetRoot, '.promptos-init.json'),
    JSON.stringify(metadata, null, 2),
    'utf8'
  );

  console.log('Setup PromptOS concluido.');
  console.log(`Destino: ${targetRoot}`);
  console.log('Proximo passo: use /itzamna.init no chat para preencher o contexto do projeto.');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.command) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }
  if (args.command === 'init') {
    await initCommand(args);
    return;
  }
  console.error(`Comando desconhecido: ${args.command}`);
  console.error(usage());
  process.exit(1);
}

main().catch((err) => {
  console.error('Falha no setup:', err.message);
  process.exit(1);
});
