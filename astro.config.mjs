// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://van-automation.com',
	output: 'static',
	integrations: [
		sitemap(),
		starlight({
			title: 'Vanomation',
			favicon: '/favicon.png',
			description: 'Home automation for your campervan — tutorials for Raspberry Pi, Home Assistant, and more.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/CF209' },
			],
			sidebar: [
				{ label: 'Overview', slug: 'tutorials' },
				{
					label: 'New Tutorials',
					items: [
						{ label: 'Choosing a Home Assistant Device', slug: 'choosing_ha_hardware' },
						{ label: 'Standalone Smart Lights', slug: 'standalone_smart_lights' },
					],
				},
				{
					label: 'Original Project',
					items: [
						{ label: 'Setting up the Raspberry Pi', slug: 'setting_up_raspberry_pi' },
						{ label: 'Installing Home Assistant', slug: 'installing_home_assistant' },
						{ label: 'Controlling the Lights', slug: 'control_the_lights' },
						{ label: 'Adding Wireless Switches', slug: 'add_wireless_switches' },
						{ label: 'Monitoring Solar Power', slug: 'monitor_solar_power' },
						{ label: 'Monitoring Water Level', slug: 'monitor_water_level' },
						{ label: 'Monitoring Propane Level', slug: 'monitor_propane_level' },
						{ label: 'Adding a Van Tilt Sensor', slug: 'adding_van_tilt_sensor' },
						{ label: 'Auto-Locking Drawers', slug: 'autolocking_drawers' },
						{ label: 'Future Projects', slug: 'future_projects' },
					],
				},
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				Footer: './src/components/Footer.astro',
				Header: './src/components/Header.astro',
				PageTitle: './src/components/PageTitle.astro',
				Head: './src/components/Head.astro',
			},
		}),
	],
});
