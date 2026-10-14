<script lang="ts">
	import {
		AboutSection,
		BootScreen,
		ContactSection,
		EducationSection,
		ExperienceSection,
		Footer,
		HeroSection,
		MatrixRain,
		Navbar,
		OrganizationsSection,
		ProjectsSection,
		Seo,
		SkillsSection,
		TerminalLauncher,
		TerminalWindow
	} from '#lib/components/index.ts';
	import { ui } from '#lib/stores/ui.svelte.ts';
</script>

<Seo />
<BootScreen />
<Navbar />

<main>
	<HeroSection />
	<AboutSection />
	<SkillsSection />
	<ExperienceSection />
	<EducationSection />
	<ProjectsSection />
	<OrganizationsSection />
	<ContactSection />
</main>

<Footer />
<TerminalLauncher />

{#if ui.terminalOpen}
	<TerminalWindow />
{/if}

{#if ui.matrixOpen}
	<MatrixRain />
{/if}
