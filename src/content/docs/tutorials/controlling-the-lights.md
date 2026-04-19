---
title: Controlling the Lights
description: Use N-Channel MOSFETs and Raspberry Pi GPIO pins to control and dim 12V LED lights through Home Assistant.
sidebar:
  order: 3
---

With Home Assistant installed we can now add a first interface: control of the lights. This involves some wiring, soldering, and circuit work, so a basic understanding of circuits is recommended.

## What you'll need

- **[Raspberry Pi Starter Kit](https://www.amazon.com/gp/product/B06WP7169Y)** — If you're new to electronics, a starter kit comes with basic components, wires, a breadboard, and a GPIO extension board useful for prototyping.
- **[Soldering Iron](https://www.amazon.com/ANBES-Soldering-Iron-Kit-Electronics/dp/B06XZ31W3M)** — A basic kit will do.
- **[Multimeter](https://www.amazon.com/Fluke-101-Multimeter-Resistance-Capacitance/dp/B00HE6MIJY)** — Always check for shorts before powering circuits. I upgraded to Fluke after a cheaper one failed.
- **[N-Channel MOSFETs](https://www.amazon.com/gp/product/B07CTF1JVD)** — Used to switch the lights on and off.
- **[12V LED Lights](https://www.amazon.com/gp/product/B012ZOI3ZW)** — The lights I use in my van.

## The circuit

The Raspberry Pi GPIO pins operate at 3.3V and can't drive 12V lights directly. Instead, we use the GPIO pins to switch an N-Channel MOSFET, which in turn switches the 12V supply to the lights:

![MOSFET switching circuit diagram](/img/lights/lights1.png)

The GPIO pin drives the **gate** of the MOSFET (pin 2). When the gate voltage exceeds the threshold voltage, the MOSFET turns on and allows current to flow from the **drain** (pin 1) to the **source** (pin 3).

:::caution
Make sure the MOSFET's gate threshold voltage is less than 3.3V, otherwise the Raspberry Pi won't be able to drive it.
:::

A 10kΩ resistor is added between gate and ground to keep the MOSFET off when the GPIO pin is unconfigured.

I assembled this by soldering wires directly to the MOSFETs and connecting the gate to a breadboard with the resistor and GPIO extension board:

![MOSFET circuit assembled on breadboard](/img/lights/lights2.jpeg)

For GPIO pins, use **GPIO 12, 13, 18, or 19** — these are the hardware PWM pins that allow dimming. I used 12 and 13, with the circuit replicated twice for two light zones.

## Step 1 — Enable GPIO control

Install and enable `pigpiod`:

```bash
sudo apt-get install pigpio
sudo systemctl enable pigpiod
```

Enable remote GPIO via `raspi-config`:

```bash
sudo raspi-config
```

Choose **3 - Interface Options → P8 - Remote GPIO → Yes**. Exit and reboot.

## Step 2 — Add lights to Home Assistant

Navigate to your Home Assistant config directory and add the following to `configuration.yaml`:

```yaml
light:
- platform: rpi_gpio_pwm
  leds:
  - name: Bed Lights
    driver: gpio
    pins: [12]
    type: simple
    frequency: 50000
  - name: Main Lights
    driver: gpio
    pins: [13]
    type: simple
    frequency: 50000
```

This config sets up two light zones on GPIO 12 and 13. Adjust names and pin numbers to match your setup. For frequency, I experimented until I found a value that avoided visible flickering when dimmed — too low causes flickering, and some values cause a high-pitched ringing from the lights.

After restarting Home Assistant, you can add a light card to your dashboard:

![Home Assistant dashboard with light control card](/img/lights/lights3.png)

## Update: Custom ESP32 PCB

I later designed a custom PCB using an ESP32 microcontroller to control the lights, cleaning up the wiring around the Pi. The same basic MOSFET circuit is used, but with PWM outputs from the ESP32 instead. KiCad files are here:

[ESP32 PCB KiCad Files](https://github.com/CF209/kicad/tree/main/ESP32_12v_Relay)

![Custom ESP32 PCB for light control](/img/lights/lights5.jpg)

I originally planned to use ESPHome, but the PCB uses the ESP32-C3 which wasn't supported by ESPHome yet. I ended up writing the firmware in C:

[ESP32 Smart Light Control](https://github.com/CF209/ESP32-Smart-Light-Control)

On first startup, the ESP32 starts in soft-AP mode and hosts a web server for configuration — WiFi network, light names, and MQTT server. With the MQTT integration in Home Assistant, the lights show up as devices automatically:

![ESP32 web configuration interface](/img/lights/lights6.png)

---

**Next:** [Adding Wireless Switches →](/tutorials/adding-wireless-switches/)
