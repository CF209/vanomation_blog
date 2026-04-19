---
slug: add_wireless_switches
title: Adding Wireless Switches
description: Add Zigbee wireless buttons around the van to control the lights without running any new wiring.
sidebar:
  order: 4
---

With the lights set up through Home Assistant I could control them from my phone or computer, but it would be nice to have some physical switches around the van as well. Wiring up light switches can be a pain and a lot of work, so I decided to use **Zigbee wireless buttons** instead.

## What you'll need

- **[Aqara Wireless Mini Switch](https://www.amazon.com/gp/product/B07D19YXND)** — Wireless and battery powered, easy to install anywhere.
- **[Zigbee USB Dongle](https://www.amazon.com/gp/product/B07KW1N1MR)** — The Raspberry Pi doesn't have Zigbee built in. This is a cheap option that works well for my use case. It comes with the programming adapter which is needed.
- **[CC Debugger](https://www.amazon.com/gp/product/B07T13JX32)** — Used to program the Zigbee dongle with the correct firmware.

## Step 1 — Flash the Zigbee dongle

The first step is to program the Zigbee dongle with the correct firmware. The process is well-documented here:

[Flashing the CC2531](https://www.zigbee2mqtt.io/information/flashing_the_cc2531.html)

![Zigbee CC2531 dongle connected to CC Debugger](/img/switches/switches9.jpg)

## Step 2 — Add the Zigbee integration

Insert the programmed dongle into the Raspberry Pi. In Home Assistant, go to **Configuration → Integrations → Add Integration**, search for **Zigbee Home Automation**, and add it. It should automatically detect the dongle and set itself up.

## Step 3 — Pair the Aqara switch

From the Integrations page, click **Configure** on your Zigbee integration, then **Add Device**. Take out your Aqara switch and remove the battery tab. Press and hold the small button on top of the device — Home Assistant should discover it:

![Home Assistant discovering the Aqara switch](/img/switches/switches1.png)

Sometimes this takes a few tries. It helps to hold the button closer to the Raspberry Pi during pairing. After discovery, rename the device to something descriptive.

## Step 4 — Create an automation

With the button configured, link it to the lights with an automation. Go to **Configuration → Automations → Add Automation**.

Add a trigger for when the button is pressed:

![Automation trigger — button press](/img/switches/switches2.png)

Then add an action to toggle the light:

![Automation action — toggle light](/img/switches/switches3.png)

The `transition` property adds a nice effect of gradually increasing or decreasing brightness. I also created a second automation for controlling the bed lights from a double press.

## Result

The button now controls the lights! I have one by the steering wheel, one by the sliding door, one by the bed, and one centered on a cabinet:

![Aqara wireless switch mounted in the van](/img/switches/switches4.jpg)

## Bonus: Temperature and humidity sensor

You can follow the same steps above to add other Zigbee devices. I added this temperature and humidity sensor:

[Aqara Temperature and Humidity Sensor](https://www.amazon.com/gp/product/B07D37FKGY)

![Aqara temperature and humidity sensor in the van](/img/switches/switches8.jpg)
