// Point d'entrée unique : import { HeroSection, Navbar } from '#lib/components/index.ts';

// Mise en page
export { default as BootScreen } from './layout/BootScreen.svelte';
export { default as Footer } from './layout/Footer.svelte';
export { default as Navbar } from './layout/Navbar.svelte';
export { default as Seo } from './layout/Seo.svelte';

// Sections de la page d'accueil, dans l'ordre d'affichage
export { default as HeroSection } from './sections/HeroSection.svelte';
export { default as AboutSection } from './sections/AboutSection.svelte';
export { default as SkillsSection } from './sections/SkillsSection.svelte';
export { default as ExperienceSection } from './sections/ExperienceSection.svelte';
export { default as EducationSection } from './sections/EducationSection.svelte';
export { default as ProjectsSection } from './sections/ProjectsSection.svelte';
export { default as OrganizationsSection } from './sections/OrganizationsSection.svelte';
export { default as ContactSection } from './sections/ContactSection.svelte';

// Terminal et effets
export { default as TerminalLauncher } from './terminal/TerminalLauncher.svelte';
export { default as TerminalWindow } from './terminal/TerminalWindow.svelte';
export { default as MatrixRain } from './effects/MatrixRain.svelte';
