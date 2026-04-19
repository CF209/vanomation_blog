---
title: Installing Home Assistant
description: Install Home Assistant as a Docker container on the Raspberry Pi and access it from any device on your network.
sidebar:
  order: 2
---

After doing the initial setup of the Raspberry Pi, the next step is to install Home Assistant on the Pi. Home Assistant is an open source home automation interface designed to work with lots of existing IoT devices and is very customizable for any application. It's also commonly run on a Raspberry Pi with lots of community support online — that's why I chose it for this project.

## Container vs. full OS

The two recommended installation methods are the full Home Assistant OS or the Home Assistant container. While the full OS has more features, it limits the Pi to only running Home Assistant. Since I want to run other scripts and applications on the Pi and have better control of its interfaces, I went with the **container installation**.

## Step 1 — Install Docker

Install Docker by downloading and running the install script:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Step 2 — Install Home Assistant

The Home Assistant website has [good instructions](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-container), but we need one small modification: add the `--privileged` flag so Home Assistant has access to GPIO and USB devices. Run the following command (replacing `PATH_TO_YOUR_CONFIG` with the actual path you want to use):

```bash
sudo docker run --init -d \
  --name homeassistant \
  --restart=unless-stopped \
  -v /etc/localtime:/etc/localtime:ro \
  -v /PATH_TO_YOUR_CONFIG:/config \
  --network=host \
  --privileged \
  homeassistant/raspberrypi4-homeassistant:stable
```

## Step 3 — Access the web interface

Once Home Assistant finishes installing it will start automatically. Open a browser and navigate to:

```
http://<YOUR_PI_IP>:8123
```

You should see the Home Assistant setup page:

![Home Assistant initial setup page](/img/install/install2.png)

Follow the prompts to finish configuring it. Once done, you'll see the default dashboard:

![Home Assistant default dashboard](/img/install/install3.png)

## Accessing from your phone

You can reach Home Assistant from any phone or computer on your network using the same address above, or via the official Home Assistant app.

I originally mounted an old smartphone in the van and ran the Home Assistant app on it, but the screen was a bit small. I recently found a good deal on a Kindle Fire tablet and switched to that. I use the **Fully Kiosk** app to display the Home Assistant webpage as the main screen on the tablet — now I have a dedicated panel to control everything.

![Kindle Fire tablet mounted in the van showing Home Assistant](/img/install/install4.jpg)

Home Assistant isn't very useful without integrating it with the van's systems, so next we'll use it to control the lights!

---

**Next:** [Controlling the Lights →](/tutorials/controlling-the-lights/)
