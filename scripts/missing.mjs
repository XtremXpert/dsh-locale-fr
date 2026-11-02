#!/usr/bin/env node
/** Report client namespaces that ship no French dictionary, in either declaration form. */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.argv[2] ?? process.cwd()
const GROUPS = ['packages/client', 'packages/experimental']
// Both declaration forms: `export const fr = {…}` and prefixed exports such as `export const zoomFr = {…}`.
const HAS_FR = /(?:export\s+const\s+[A-Za-z_]*[Ff]r[A-Za-z_]*\s*=|(?:^|\n)\s*fr:\s*\{)/u

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (entry === 'lib' || entry === 'node_modules' || entry === 'tests') continue
    if (statSync(full).isDirectory()) walk(full, out)
    else if (/locales[^/]*\.ts$/u.test(entry)) out.push(full)
  }
  return out
}

let missing = 0
let covered = 0
for (const group of GROUPS) {
  let files
  try { files = walk(join(ROOT, group)) } catch { continue }
  for (const file of files.sort()) {
    const text = readFileSync(file, 'utf8')
    if (HAS_FR.test(text)) { covered += 1; continue }
    missing += 1
    console.log(`${String(text.split('\n').length).padStart(5)}  ${file.slice(ROOT.length + 1)}`)
  }
}
console.log(`\n${covered} avec français, ${missing} sans`)
