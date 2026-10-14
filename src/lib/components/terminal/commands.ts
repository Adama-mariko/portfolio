import { education, experiences, navigation, profile, projects, skillCategories } from '#lib/data/index.ts';
import { getTech } from '#lib/utils/tech-icons.ts';

/** Actions que les commandes peuvent déclencher sur l'interface. */
export interface TerminalContext {
	clear: () => void;
	close: () => void;
	openMatrix: () => void;
}

interface Command {
	description: string;
	run: (args: string[], context: TerminalContext) => string[];
}

const pad = (text: string, width: number) => text.padEnd(width, ' ');

export const commands: Record<string, Command> = {
	help: {
		description: 'Liste des commandes',
		run: () => Object.entries(commands).map(([name, command]) => `${pad(name, 12)} ${command.description}`)
	},
	whoami: {
		description: 'Qui suis-je ?',
		run: () => [`${profile.firstName} ${profile.lastName} — ${profile.role}`, profile.summary]
	},
	stack: {
		description: 'Compétences techniques',
		run: () =>
			skillCategories.map(
				(category) => `${pad(category.label, 12)} ${category.techs.map((id) => getTech(id).label).join(', ')}`
			)
	},
	projects: {
		description: 'Projets réalisés',
		run: () =>
			projects.map((project) => {
				const live = project.links.find((link) => link.kind === 'live');
				return `${pad(project.name, 34)} ${live?.url ?? project.year}`;
			})
	},
	experience: {
		description: 'Parcours professionnel',
		run: () => experiences.map((job) => `${job.hash}  ${pad(job.period, 20)} ${job.role} @ ${job.company}`)
	},
	education: {
		description: 'Formation',
		run: () => education.map((item) => `${pad(item.period, 14)} ${item.degree} — ${item.school}`)
	},
	contact: {
		description: 'Coordonnées',
		run: () => [
			`email     ${profile.email}`,
			`phone     ${profile.phones.join(' / ')}`,
			`github    ${profile.links.github}`
		]
	},
	goto: {
		description: `Aller à une section : ${navigation.map((item) => item.id).join(', ')}`,
		run: ([id], { close }) => {
			const section = id ? document.getElementById(id) : null;
			if (!section) return [`Section inconnue : ${id ?? '(vide)'}`];
			close();
			section.scrollIntoView({ behavior: 'smooth' });
			return [];
		}
	},
	cv: {
		description: 'Ouvrir le CV (PDF)',
		run: () => {
			window.open(profile.cv, '_blank', 'noopener');
			return ['Ouverture du CV…'];
		}
	},
	football: {
		description: 'Hors du code',
		run: () => ['Passionné de football : vision du jeu, jeu collectif et sens du dernier geste.']
	},
	matrix: {
		description: 'Entrer dans la matrice',
		run: (_args, { close, openMatrix }) => {
			close();
			openMatrix();
			return [];
		}
	},
	clear: {
		description: 'Effacer l’écran',
		run: (_args, { clear }) => {
			clear();
			return [];
		}
	},
	exit: {
		description: 'Fermer le terminal',
		run: (_args, { close }) => {
			close();
			return [];
		}
	}
};

/** Exécute une ligne saisie et renvoie les lignes à afficher. */
export function execute(input: string, context: TerminalContext): { lines: string[]; error: boolean } {
	const [name, ...args] = input.trim().split(/\s+/);
	const command = commands[name.toLowerCase()];
	if (!command) return { lines: [`Commande introuvable : ${name}. Tapez « help ».`], error: true };
	return { lines: command.run(args, context), error: false };
}
