// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://vanomation.com',
	integrations: [
		starlight({
			title: 'Vanomation',
			description: 'Home automation for your campervan — tutorials for Raspberry Pi, Home Assistant, and more.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/CF209/vanomation' },
			],
			sidebar: [
				{
					label: 'Tutorials',
					items: [
						{ label: 'Setting up the Raspberry Pi', slug: 'tutorials/setting-up-raspberry-pi' },
						{ label: 'Installing Home Assistant', slug: 'tutorials/installing-home-assistant' },
						{ label: 'Controlling the Lights', slug: 'tutorials/controlling-the-lights' },
						{ label: 'Adding Wireless Switches', slug: 'tutorials/adding-wireless-switches' },
						{ label: 'Monitoring Solar Power', slug: 'tutorials/monitoring-solar-power' },
						{ label: 'Monitoring Water Level', slug: 'tutorials/monitoring-water-level' },
						{ label: 'Monitoring Propane Level', slug: 'tutorials/monitoring-propane-level' },
						{ label: 'Adding a Van Tilt Sensor', slug: 'tutorials/adding-van-tilt-sensor' },
						{ label: 'Auto-Locking Drawers', slug: 'tutorials/autolocking-drawers' },
						{ label: 'Future Projects', slug: 'tutorials/future-projects' },
					],
				},
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				Footer: './src/components/Footer.astro',
			},
		}),
	],
});
