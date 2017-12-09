---
title: Cara blok ads injection dari Telkom
date: "2016-10-03T22:12:03.284Z"
tags: ['ads-injection', 'telkom', 'ads']
---

Analoginya begini. Misal kita beli app di Play Store, ekspektasi kita adalah kita tidak perlu melihat ads/iklan di app tersebut. Kalau tidak, ya cukup pakai yang free saja. Akan tetapi ketika kita berlangganan Indihome dari Telkom, kita masih melihat iklan besar di header.

<img class="pure-img-responsive image-center" src="/images/example.png" alt="contoh ads injection dari telkom" />

Hal ini sudah cukup jelas dibahas oleh [Raymond](https://medium.com/@grumpyuser/telkom-indonesia-secretly-injects-advertisements-a3bf10b447ee#.cit9yjs3t), jadi tidak perlu dibahas detail di sini. Yang ingin saya bahas adalah bagaimana cara kita blok ads ini agar tidak muncul ketika kita browsing.

## Langkah-langkah

* Install [adblock](https://getadblock.com) di browser
* Klik option 

<img class="pure-img-responsive image-center" src="/images/option.png" width=300" />

* Tambahkan url ini di tab "Customize": `http://cfs.uzone.id/assets/js/jquery-1.11.2.min.js`

<img class="pure-img-responsive image-center" src="/images/adblock.png" width="450" />

* Done, bebas dari ads injection!

<img class="pure-img-responsive image-center" src="http://i.giphy.com/QpOZPQQ2wbjOM.gif" />