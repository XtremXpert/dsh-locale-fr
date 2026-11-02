# dsh-locale-fr

French language pack for the **DeepSeek Harness** Web UI.

The Harness ships two baseline locales (`zh`, `en`) plus `fr` dictionaries for a handful of small namespaces.
Every other namespace falls back to English. This pack fills the gaps through the documented language-pack API,
without touching the Harness source.

## Why a pack, not a patch

`ctx.locale.register(ns, 'fr', { … })` merges into the active language at runtime; unknown keys keep the English
fallback, so batches can land one namespace at a time and never break the interface.

## Install

```sh
git clone https://github.com/XtremXpert/dsh-locale-fr.git ~/.dsh/plugins/locale-fr
```

Then add a loader row to the profile you use (`~/.dsh/profiles/desktop/cordis.patch.yml` or `…/web/…`):

```yaml
- insert:
    - id: dsh-locale-fr
      name: 'dsh-locale-fr'
```

Restart the application (or touch `cordis.patch.yml` to reload the configuration), then pick **Français** in
Settings → Language.

## Coverage

| Namespace | State |
|---|---|
| `conversation` | composer, shortcuts, hints, placeholders |
| `common` | already shipped by the Harness |
| `plugin-manager`, `settings-*`, `workspace`, `schedule`, `trajectory` | pending |

Run the audit to see what remains:

```sh
node scripts/missing.mjs /path/to/deepseek-harness
```

It prints every namespace without an `fr` block, largest first is up to you to sort.

## Adding a batch

1. Open the target `locales.ts` (for example `packages/client/ui-plugin-manager/src/client/locales.ts`).
2. Copy the English keys, translate the values.
3. Add them under `batches` in `client.js` and register the namespace in `apply`.
4. Reload the application and check the screen.

Placeholders (`{name}`), slash commands, and API field names stay verbatim.
