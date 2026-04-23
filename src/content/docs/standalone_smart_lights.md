---
slug: standalone_smart_lights
title: Standalone Smart Lights
description: Install Shelly Plus RGBW and Shelly BLU Buttons for hub-free smart van lighting with Bluetooth remote switches and optional Home Assistant integration.
sidebar:
  order: 1
---

One of the largest issues I had with the old system was that the light control relied on too many other systems. There were many other components that could fail and cause the lights to not work which can be very frustrating! These included the Raspberry Pi running Home Assistant, the Zigbee dongle and Zigbee2MQTT service, the light controller, or even just the wifi network. Having remote control of the lights was also one of my favorite features of the smart system, so I wanted to set out to solve these problems.

My requirements were:
1) Be able to control the lights with remote switches
2) Have hard wired control from a switch that doesn't rely on any wireless signals
3) Have direct communication between the light controller and remote switches
4) Be able to also integrate into Home Assistant
5) Avoid any custom hardware for simplicity

## What you'll need

- **[Shelly Plus RGBW PM](https://amzn.to/4vGqBVW)** — This little device is great for controlling 12V or 24V lights. It has 4 channels for controlling single color lights, or a single channel for controlling RGBW lights. It also has 4 inputs that can be used for local hard wired control.
- **[Shelly BLU Button](https://amzn.to/48Zejhw)** — Battery powered bluetooth button that can communicate directly with the Shelly Plus RGBW PM. Also comes in a "tough" version.
- **[12V LED Lights](https://amzn.to/4sTrnfP)** — The lights I use in my van.
- **Wall Switch** - Many different options depending on the configuration you want. I'll go more into this later

## Light Wiring

> ⚠️ **Warning:** Disconnect all power before touching any wires

![Shelly Wiring](../../assets/img/standalone/shelly_wiring.webp)

Follow the above diagram to wire up the lights. Connect your power wire (12V or 24V) to the **+** pin and ground wire to the **⊥** pin to power the Shelly. You can ignore the switch wiring for now, we'll go into that more later.

Connect the **+** side of your lights directly to 12V/24V power and the **-** side to one of the 4 channels on the Shelly labeled "R", "G", "B", or "W". Note this wiring is only for single color LED lights. You may connect more than one LED light in parallel to the same Shelly channel if you have multiple lights in a group that you want to control together, just note that each channel supports a maximum of 4A and 10A max for the whole device, so check the specification for your lights!

## Connect the Shelly to WiFi

Once the wiring is done and the power has been turned back on, it's time to set up the Shelly. The Shelly automatically starts up in Access Point mode with an SSID that starts with "ShellyPlusRGBWPM". Connect to this network, then in a web browser navigate to http://192.168.33.1/ to access the Shelly web interface.

If you have wifi in your Van or a hotspot, you can connect the Shelly by going to Settings -> Wifi and entering your wifi details. Once the Shelly connects, you can see the IPv4 address in the Wi-Fi status section:

![Wi-Fi Status](../../assets/img/standalone/wifi_status.png)

Copy this IP address, then you can disconnect from the Shelly network and reconnect to your wifi network. The same Shelly web interface should be accessible from that IP address you copied. If you want to ensure this IP address never changes, you can also set a static IP in the Shelly web interface.

## Configure the Shelly for your lights

The default configuration for the shelly is for RGBW mode, so we need to reconfigure it for Lights x4 mode. Go to Settings -> Device Profile, select "Lights x 4" and click "Save settings"

![Device Profile](../../assets/img/standalone/device_profile.png)

Back on the home page, you should now see 4 lights corresponding to the 4 channels you wired up earlier with Light0 - R, Light1 - G, Light2 - B, and Light3 - W. Try using the controls in the web interface to control your lights and make sure they are fully working. If not, double-check your wiring.

There are some other settings you can configure now for your lights. Most settings are accessed by clicking on an individual light. These are the settings I adjusted:
- Transition duration: This changes the speed at which the lights turn on and off for a fading effect. I set this to 0.5 seconds
- Minimum brightness on toggle: If the brightness is below this value when you toggle your lights on, the brightness is automatically increased to this value. I set this to 100 so when I use the BLU buttons to toggle the lights later, they will always power on to 100% unless I specify otherwise
- High Frequency mode: If you notice a high pitched ringing noise coming from your lights when they are on, you can try enabling High Frequency mode. This can be found in the general device settings, and increases the PWM frequency used by the shelly

## Configuring the BLU button for remote control

The newer generation Shelly devices support direct BLU button control out of the box, but they unfortunately don't make a 12V version yet. Luckily, the Shelly Plus RGBW PM has bluetooth and can support the BLU buttons through the use of scripts.

I wrote the following script for my BLU button:
[blue_button_control.js](https://github.com/CF209/Shelly-Scripts/blob/main/blu_button_control.js)

To use the script, first find the MAC address for your BLU button. This can easily done with the [Shelly BLE Debug app](https://play.google.com/store/apps/details?id=cloud.shelly.bledebug&pcampaignid=web_share). Open the app, give it bluetooth permissions, then simply press your BLU button and it should appear in the app along with the MAC address. Copy this MAC address into BUTTON_MAC variable in the script here:
```javascript
// Replace with your BLU Button's MAC address (lowercase)
let BUTTON_MAC = "7c:c6:b6:9e:7b:42";
```

You can then add different light actions to the functions for each button press type as seen below. [See here for all the possible light functions](https://shelly-api-docs.shelly.cloud/gen2/ComponentsAndServices/Light/)

```javascript
// --- Define what each press type does ---

function singlePush() {
  // Toggle light channel 2
  Shelly.call("Light.Toggle", { id: 2 });
}

function doublePush() {
  // Toggle light channel 0
  Shelly.call("Light.Toggle", { id: 0 });
}

function triplePush() {
  // Turn off all lights
  Shelly.call("Light.SetAll", { on: false, transition_duration: 0.5 });
}

function longPush() {
  // Add your action here
}

function longHold() {
  // Dim all lights
  Shelly.call("Light.SetAll", { on: true, brightness: 1, transition_duration: 1 });
}
```

Before adding the script to the Shelly, make sure Bluetooth is enabled. From the web interface, go to Settings -> Bluetooth and enable it if it isn't already.

To add the script to the Shelly, go to the Scripts section in the web interface and click "Create script". Copy the full script code and click Save. Click start to run the script, and try pressing the button. The console at the bottom should show the button press, and your defined action should take effect.
```bash
BLE scanner started successfully
BLU Button press detected, type: 1
BLU Button press detected, type: 1
BLU Button press detected, type: 2
```

Back on the main Scripts page, enable "Run on startup" to make sure the script is always running, and it should be good to go!


## Control lights with Shelly app

Shelly also lets you control your devices through their app. Download the app here: [Shelly App](https://us.shelly.com/pages/shelly-app)

From the app click "Add device". If you're connected to the same wifi network as the Shelly, you can scan the local network, otherwise you can add via bluetooth. Follow the prompts to finish the setup. It may ask for your wifi info again if setting up via bluetooth.

After adding the device, it seems to automatically disable bluetooth for some reason. Be sure to re-enable this in the settings from the web interface or the app otherwise the BLU buttons will stop working.

## Control the lights with a dimmer switch

Coming soon!