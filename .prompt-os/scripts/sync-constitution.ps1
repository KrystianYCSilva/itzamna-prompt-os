# .prompt-os/scripts/sync-constitution.ps1

param(
    [ValidateSet("speckit-to-promptos", "promptos-to-speckit")]
    [string]$Direction = "speckit-to-promptos"
)

$SpecKitConstitution = ".specify/memory/constitution.md"
$ArchitecturalRules = ".context/standards/architectural-rules.md"

if ($Direction -eq "speckit-to-promptos") {
    if (Test-Path $SpecKitConstitution) {
        Copy-Item $SpecKitConstitution $ArchitecturalRules -Force
        Write-Host "Sincronizado: constitution.md -> architectural-rules.md"
    }
} else {
    if (Test-Path $ArchitecturalRules) {
        Copy-Item $ArchitecturalRules $SpecKitConstitution -Force
        Write-Host "Sincronizado: architectural-rules.md -> constitution.md"
    }
}
