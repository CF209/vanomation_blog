// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://van-automation.com',
	output: 'static',
	integrations: [
		starlight({
			title: 'Vanomation',
			description: 'Home automation for your campervan — tutorials for Raspberry Pi, Home Assistant, and more.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/CF209' },
			],
			sidebar: [
				{
					label: 'Tutorials',
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
			},
		}),
	],
});
