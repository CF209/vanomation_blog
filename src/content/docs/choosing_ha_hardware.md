---
slug: choosing_ha_hardware
title: Choosing a Home Assistant Device
description: Compare Home Assistant Green, Raspberry Pi 4, Raspberry Pi 5, and mini PCs for running Home Assistant in a campervan — covering power draw, connectivity, storage reliability, and 12V compatibility.
sidebar:
  order: 0
---

![Main image](../../assets/img/hardware/main.png)

The first step to setting up Home Assistant is picking the right hardware. While there are many comparisons out there, the campervan environment presents some unique requirements that wouldn't be present in a home. In this guide, I'll be comparing the most popular hardware options including Home Assistant Green, Raspberry Pi 4/5, and a Mini PC like the NUC based on requirements specific for a campervan. All these options generally have plenty of processing power to run Home Assistant as well. I also won't be comparing prices since they are constantly changing.

<table>
  <thead>
    <tr>
      <th></th>
      <th><a href="https://amzn.to/4e5uQnC">Home Assistant Green</a></th>
      <th><a href="https://amzn.to/4vSpZN1">Raspberry Pi 4</a></th>
      <th><a href="https://amzn.to/3QHNg43">Raspberry Pi 5</a></th>
      <th><a href="https://amzn.to/4t2rA05">NUC Mini PC</a></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Idle Power Consumption</td>
      <td style="background-color:rgba(34,197,94,0.2)">1.7W</td>
      <td style="background-color:rgba(34,197,94,0.2)">1.375W</td>
      <td style="background-color:rgba(234,179,8,0.2)">2.5W</td>
      <td style="background-color:rgba(239,68,68,0.2)">6-10W</td>
    </tr>
    <tr>
      <td>RTC (Real-time Clock)</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
      <td style="background-color:rgba(239,68,68,0.2)">No</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
    </tr>
    <tr>
      <td>Wifi</td>
      <td style="background-color:rgba(239,68,68,0.2)">No</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
    </tr>
    <tr>
      <td>Bluetooth</td>
      <td style="background-color:rgba(239,68,68,0.2)">No</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
      <td style="background-color:rgba(34,197,94,0.2)">Yes</td>
    </tr>
    <tr>
      <td>Zigbee/Thread</td>
      <td style="background-color:rgba(234,179,8,0.2)">No</td>
      <td style="background-color:rgba(234,179,8,0.2)">No</td>
      <td style="background-color:rgba(234,179,8,0.2)">No</td>
      <td style="background-color:rgba(234,179,8,0.2)">No</td>
    </tr>
    <tr>
      <td>Reliable Storage</td>
      <td style="background-color:rgba(34,197,94,0.2)">Built-in eMMC storage</td>
      <td style="background-color:rgba(234,179,8,0.2)">SSD needed</td>
      <td style="background-color:rgba(234,179,8,0.2)">SSD needed</td>
      <td style="background-color:rgba(34,197,94,0.2)">Integrated SSD</td>
    </tr>
    <tr>
      <td>Power Source</td>
      <td style="background-color:rgba(34,197,94,0.2)">12V</td>
      <td style="background-color:rgba(234,179,8,0.2)">5V 3A USB-C</td>
      <td style="background-color:rgba(234,179,8,0.2)">5V 5A USB-C</td>
      <td style="background-color:rgba(239,68,68,0.2)">19V</td>
    </tr>
  </tbody>
</table>

## Power Consumption

| |HA Green | Pi 4 | Pi 5 | NUC |
| --- | -------- | -- | -- | -- |
| Idle | [1.7W](https://www.home-assistant.io/green/) | [1.375W](https://core-electronics.com.au/guides/raspberry-pi-5-vs-raspberry-pi-4-model-b-comparison-and-benchmarking/) | [2.5W](https://core-electronics.com.au/guides/raspberry-pi-5-vs-raspberry-pi-4-model-b-comparison-and-benchmarking/) | [6-10W](https://www.servethehome.com/intel-nuc-12-pro-wall-street-canyon-review-fanned-and-fanless/4/) |

The above data is what I was able to find online for the idle power consumption of each device. I looked for load data as well, but couldn't find any comparable numbers between the devices.

While mini PCs are highly recommended for Home Assistant, the higher power consumption makes them not entirely viable for a campervan. If it averages 6W, the mini PC would use about 12Ah from a 12V battery which is quite a large percentage considering most people have 100-200Ah of power.

The Raspberry Pi 5 also draws significantly more power than the 4. Considering that the 4 should be plenty powerful enough for a campervan Home Assistant setup, this leaves the Raspberry Pi 4 and Home Assistant Green as the top two contenders.

## Real-time clock (RTC)

One of the largest drawbacks of the Raspberry Pi is that it doesn't have a real-time clock (RTC). This means that if the Raspberry Pi 4 loses power (which is quite a bit more likely in a campervan), it needs an internet connection to reset the time (which is not always available in a campervan). Not having accurate time can cause issues with Home Assistant, especially if anything is automated on a specific schedule. An RTC can be installed on the Raspberry Pi 4, but requires a bit more technical expertise.

All 3 other devices on the other hand have an RTC built in.

## Wifi

All the devices have Wifi except Home Assistant Green. This is only a negative if you plan to install your Home Assistant device in a different location than your router though since you can connect the Green to your router with ethernet. Otherwise, a [USB wifi adapter](https://amzn.to/48iyAP2) would be required.

## Bluetooth

Again, all the devices have Bluetooth built in except Home Assistant Green. If you plan on integrating with any Bluetooth devices you will either need a USB [Bluetooth adapter](https://amzn.to/4d71jc8) (which are quite cheap), or use a [Bluetooth proxy with ESPHome](https://esphome.io/components/bluetooth_proxy/)

## Zigbee/Thread

None of the devices support Zigbee or Thread out of the box, so they all need a USB adapter. [Here's a good option for Zigbee](https://amzn.to/4mROkOY). [Or one that works for both Zigbee and Thread](https://amzn.to/3R0H7jy)

## Storage

One issue with either Raspberry Pi is that the default storage option is an SD card. While these are cheap, they are also notoriously unreliable. Because of this, it is recommended to use an external USB SSD, or with the Raspberry Pi 5, an M.2 drive with the M.2 hat.

Home Assistant Green has built in eMMC storage, and Mini PCs have built in SSDs, so this is not a concern.

## Power Source

Home Assistant Green has a 12V input which in theory makes it the best choice for a 12V system, but unfortunately in reality the voltage for a standard LiFePO4 battery can range from 10V to 14.6V. While the Home Assistant Green can most likely handle this voltage range, it is not documented anywhere and it would be a shame to fry such an expensive device, so I'd recommend using a [12V regulator](https://amzn.to/4eE5tcM) for it.

Either Raspberry Pi just needs a USB-C outlet that supports 5V 3A for the 4, or 5V 5A for the 5. [One like this should work](https://amzn.to/4tyiklt)

Different models have different input voltages, but many I've looked at use 19V and need a [step up converter like this one](https://amzn.to/48mZJjK). Be sure to check your individual model though.

## Conclusion

**[Home Assistant Green](https://amzn.to/4e5uQnC)** - The best option assuming it's placed close to your router or you don't mind routing an ethernet cable. A hard wired ethernet connection is generally recommended anyways for reliability. Bluetooth/Zigbee/Thread adapters can be added as needed, but no additional setup is required beyond this. It also comes pre-installed with Home Assistant so is the easiest to set up.

**[Raspberry Pi 4](https://amzn.to/4vSpZN1)** - The best option for a wifi connected setup. Some additional technical expertise is required for setup if you are adding an RTC and external SSD (which are both recommended), but you can get started without these too. I'd also go with this over Home Assistant Green if I already had one on hand.

**[Raspberry Pi 5](https://amzn.to/3QHNg43)** - More power consumption than the 4, and adding an external SSD or M.2 SSD is recommended, but if you already have one on hand I wouldn't hesitate to use it.

**Mini-PC** - Generally overkill for a campervan setup and draws too much power, but would still work. Just make sure you confirm the input voltage required for your model and buy the correct regulator.
