/**
 * dsh-locale-fr — BROWSER half.
 *
 * Registers French dictionaries for the Harness Web UI namespaces that ship no
 * `fr` block of their own. Missing keys stay on the English fallback, so batches
 * can land incrementally.
 *
 * @module dsh-locale-fr/client
 */

window.__ModuleLoader__.load({
	id: 'dsh-locale-fr',
	factory: () => {
		const module = { exports: {} }
		const exports = module.exports
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

		/** Composer and hint copy of the chat surface. */
		const conversation = {
			'quote.remove': 'Retirer la citation',
			'shortcut.newline': 'Nouvelle ligne',
			'shortcut.complementary': 'Utiliser le mode complémentaire Queue/Steer',
			'shortcut.slash': 'Ouvrir le menu des commandes',
			'shortcut.mention': 'Ouvrir le menu des références',
			'hint.plan': 'Décrivez votre tâche pour générer un plan',
			'hint.goal': 'Saisissez un objectif : l’agent l’exécutera en continu',
			'hint.goal.active': 'Objectif en cours. Saisissez edit pour modifier, pause, resume ou clear',
			'placeholder.plan': 'Décrivez votre tâche pour générer un plan',
			'placeholder.default': 'Envoyez un message ou créez une tâche, / commandes, @ fichiers',
			'placeholder.unavailable': 'Session indisponible',
			'placeholder.parentOffline': 'Session parente hors ligne : envoi impossible, arrêt toujours possible',
			'placeholder.hero': 'Décrivez ce que vous voulez construire, / commandes, @ fichiers',
			'placeholder.workspace': 'Choisissez un espace de travail pour commencer',
			'placeholder.steerQueue': 'Cmd/Ctrl+Entrée envoie tous les messages en file',
			'input.commands': 'Ajouter un fichier ou appeler une commande',
			'input.file': 'Fichier',
			'input.stop': 'Arrêter la génération',
			'input.send': 'Envoyer le message',
		}

		/**
		 * Register every batch this pack ships.
		 * @param ctx - client context owning the locale registry.
		 */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register('conversation', 'fr', conversation), 'dsh-locale-fr: conversation')
		}

		exports.apply = apply
		exports.inject = ['locale']
		exports.batches = { conversation }
		return module.exports
	},
})
