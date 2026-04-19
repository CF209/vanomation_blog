---
slug: monitor_solar_power
title: Monitoring Solar Power
description: Read data from a Renogy charge controller over serial and publish it to Home Assistant via MQTT.
sidebar:
  order: 5
---

With the lights set up and working, next I wanted to add monitoring of different systems in the van. The first one was monitoring solar power by interfacing with my charge controller.

## What you'll need

- **[Renogy Rover Charge Controller](https://www.amazon.com/gp/product/B07DNVW37B)** — I have the 30A version. This setup should work with any charge controller in the Rover series.
- **[USB Serial Dongle](https://www.amazon.com/gp/product/B00IDSM6BW)** — For serial communication from the Raspberry Pi to the charge controller.
- **[DB9 to RJ12 Adapter](https://www.amazon.com/gp/product/B0054RRCHI)** — The charge controller uses a non-standard serial pinout, so this adapter is needed.
- **[RJ12 Cable](https://www.amazon.com/gp/product/B08BHVF6XS)** — To connect the adapter to the charge controller.

## Building the cable

Renogy used to include a USB-to-RJ12 cable with their charge controllers, but stopped after introducing their Bluetooth module. We need to build our own.

The three components: the USB serial dongle (for the correct protocol), the DB9-to-RJ12 adapter, and the RJ12 cable (with correct pin mapping for the Renogy controller).

The Renogy charge controller's RJ12 pinout is: **TX / RX / GND / GND / +12V / +12V**. On the USB serial dongle: pin 2 is RXD, pin 3 is TXD, pin 5 is GND. Connect RJ12 TX → serial dongle RXD and RJ12 RX → serial dongle TXD, plus GND.

![DB9 to RJ12 adapter wiring](/img/solar/solar1.jpeg)

![Completed cable assembly](/img/solar/solar2.jpeg)

:::caution
Before connecting the cable to the serial dongle, use a multimeter to verify pin voltages: TX to GND and TX to RX should both read about 5V. Make sure you haven't accidentally connected the 12V pins — that could fry the serial dongle and possibly the Raspberry Pi.
:::

![Multimeter voltage check on cable](/img/solar/solar5.jpg)

## Step 1 — Identify the serial port

With the cable connected between the Pi and charge controller, find the USB serial dongle's device name:

```bash
pi@raspberrypi:~ $ ls /dev/*USB*
/dev/ttyUSB0
```

## Step 2 — Install Solarshed

Someone has already written a Python library called **Solarshed** that handles reading data from the Renogy controller:

[https://github.com/corbinbs/solarshed](https://github.com/corbinbs/solarshed)

Install it with:

```bash
pip install solarshed
```

## Step 3 — Run the MQTT publisher script

I wrote a script that reads the current solar power from the charge controller every second using Solarshed and publishes the data to the MQTT server on the Pi:

[solar\_mqtt.py](https://github.com/CF209/vanomation/blob/main/python/solar/solar_mqtt.py)

If your serial dongle is at a different address, change this line:

```python
controller = RenogyRover('/dev/ttyUSB0', 1)
```

## Step 4 — Create a systemd service

To keep the script always running, turn it into a systemd service:

```bash
sudo nano /lib/systemd/system/solar_mqqt.service
```

Add the following, updating the `ExecStart` path to match your script location:

```ini
[Unit]
Description=Solar MQTT
After=multi-user.target

[Service]
Type=idle
ExecStart=/usr/bin/python3 /home/pi/python/solar/solar_mqtt.py
WorkingDirectory=/home/pi
User=pi
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable solar_mqqt.service
```

Check that it's running:

```bash
sudo systemctl status solar_mqtt.service
```

## Step 5 — Add the sensor to Home Assistant

In Home Assistant, go to **Configuration → Integrations** and add the **MQTT** integration. Then add the following to your `configuration.yaml`:

```yaml
sensor:
  - platform: mqtt
    state_topic: "van/solar/power"
    name: 'Solar Power'
    unit_of_measurement: 'W'
    value_template: '{{ value_json.power }}'
```

Restart Home Assistant and add the sensor to your dashboard:

![Solar power sensor on Home Assistant dashboard](/img/solar/solar3.png)
