import { useState, useEffect } from "react";

/*
 ═══════════════════════════════════════════════════════════════
  ARCO — Pixel-perfect JSX from actual source CSS
  Source: https://uithemez.com/i/arco/css/style.css
  
  Font    : Rubik (confirmed from CSS comment "main Font: Rubik")
  Accent  : #2AAFC0 (confirmed from CSS "Main Color: #2AAFC0")
  Gradient: linear-gradient(to right, #2AAFC0, #6976c5)
  Gray bg : #f7f7f7
  Footer  : #111 background, 80px padding
  Section : 120px 0 padding
  Navbar  : transparent absolute → white fixed on scroll
 ═══════════════════════════════════════════════════════════════
*/

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');

    *, *::before, *::after {
      margin: 0; padding: 0;
      box-sizing: border-box;
      outline: none; list-style: none;
      word-wrap: break-word;
    }

    html { scroll-behavior: smooth; }

    body {
      color: #000;
      line-height: 1.3;
      font-weight: 400;
      font-size: 14px;
      font-family: 'Rubik', sans-serif;
      overflow-x: hidden;
    }

    p {
      font-size: 15px;
      font-weight: 300;
      color: #7f7f7f;
      line-height: 1.6;
      margin: 0;
    }

    img { width: 100%; height: auto; display: block; }
    a, a:hover { display: inline-block; text-decoration: none; color: inherit; }

    /* Typography scale from helper.css */
    h1 { font-size: 55px; }
    h2 { font-size: 40px; }
    h3 { font-size: 35px; }
    h4 { font-size: 30px; }
    h5 { font-size: 25px; }
    h6 { font-size: 18px; }
    h1,h2,h3,h4,h5,h6 { margin: 0; font-weight: 600; font-family: 'Rubik', sans-serif; }

    /* ── LAYOUT ── */
    .arco-container {
      width: 100%;
      max-width: 1170px;
      margin: 0 auto;
      padding: 0 15px;
    }
    .arco-row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -15px;
    }
    .col-12 { width: 100%; padding: 0 15px; }
    .col-6  { width: 50%; padding: 0 15px; }
    .col-4  { width: 33.333%; padding: 0 15px; }
    .col-3  { width: 25%; padding: 0 15px; }

    .section-padding { padding: 120px 0; }
    .bg-gray { background: #f7f7f7; }
    .text-center { text-align: center; }
    .valign { display: flex; align-items: center; }

    /* ── SECTION HEAD ── */
    .section-head { margin-bottom: 80px; text-align: center; }
    .section-head h6 {
      color: #333;
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 2px;
      display: inline-block;
      padding: 0 15px;
      position: relative;
    }
    .section-head h6::before,
    .section-head h6::after {
      content: '';
      width: 40px;
      height: 1px;
      background-color: #2AAFC0;
      position: absolute;
      bottom: 3px;
    }
    .section-head h6::before { left: -40px; }
    .section-head h6::after  { right: -40px; }
    .section-head h4 {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    /* ── BUTTONS ── */
    .butn {
      padding: 14px 30px;
      background: #fff;
      border: 1px solid transparent;
      position: relative;
      z-index: 3;
      margin: 0 10px;
      box-shadow: 0px 10px 30px rgba(0,0,0,0.1);
      transition: all .4s;
      cursor: pointer;
      overflow: hidden;
      display: inline-block;
      font-family: 'Rubik', sans-serif;
      font-size: 13px;
      letter-spacing: .5px;
    }
    .butn span {
      position: relative;
      z-index: 2;
      transition-delay: 0s;
    }
    .butn::before, .butn::after {
      content: '';
      width: 0; height: 100%;
      background: #fff;
      position: absolute;
      left: 0; top: 0;
      transition: width 0.4s;
      z-index: 1; opacity: .4;
    }
    .butn::after { transition-delay: 0s; opacity: 1; }
    .butn:hover::before, .butn:hover::after { width: 100%; }
    .butn:hover::after { transition-delay: .2s; }
    .butn:hover span  { transition-delay: .2s; }

    .butn-bg { background: #2AAFC0; border-color: #2AAFC0; color: #fff; }
    .butn-bg:hover span { color: #2AAFC0; }

    .butn-light::before, .butn-light::after { background: #2AAFC0; }
    .butn-light:hover span { color: #fff; }
    .butn-light span { color: #2AAFC0; }

    /* ── NAVBAR ── */
    .arco-navbar {
      position: fixed;
      left: 0; top: 0;
      width: 100%;
      background: transparent;
      z-index: 9999;
      min-height: 80px;
      transition: background .4s, box-shadow .4s;
    }
    .arco-navbar.nav-scroll {
      background: #fff;
      border-bottom: 1px solid rgba(12,12,12,0.04);
      box-shadow: 0 2px 20px rgba(0,0,0,0.06);
    }
    .navbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 80px;
      max-width: 1170px;
      margin: 0 auto;
      padding: 0 15px;
    }
    .logo { width: 100px; padding: 15px 0; cursor: pointer; }
    .logo img { width: 100%; }

    .navbar-nav { display: flex; align-items: center; gap: 0; }
    .navbar-nav .nav-link {
      font-size: 13px;
      font-weight: 500;
      color: #eee;
      letter-spacing: .5px;
      margin: 15px 5px;
      transition: color .5s;
      cursor: pointer;
      padding: 5px 10px;
      background: none; border: none;
      font-family: 'Rubik', sans-serif;
    }
    .nav-scroll .navbar-nav .nav-link { color: #222; }
    .navbar-nav .nav-link:hover,
    .navbar-nav .nav-link.active { color: #2AAFC0 !important; }

    /* ── HEADER / HERO SLIDER ── */
    .arco-header {
      min-height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .arco-header::before {
      content: '';
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.7);
      z-index: 1;
    }
    .arco-header .arco-container { position: relative; z-index: 2; }
    .header-caption h4 {
      font-weight: 200;
      letter-spacing: 4px;
      color: #fff;
      margin-bottom: 10px;
      font-size: 20px;
    }
    .header-caption h1 {
      font-size: 60px;
      font-weight: 500;
      letter-spacing: 2px;
      color: #fff;
      line-height: 1.2;
      margin: 10px 0;
    }
    .header-caption .dots-line {
      margin: 20px 0 30px;
    }
    .header-caption .dots-line span {
      font-size: 13px;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: #eee;
      margin: 0 5px;
      padding-right: 14px;
      position: relative;
    }
    .header-caption .dots-line span::after {
      content: '';
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #2AAFC0;
      position: absolute;
      top: 6px; right: 0;
      opacity: .5;
    }
    .header-caption .dots-line span:last-child { padding-right: 0; }
    .header-caption .dots-line span:last-child::after { display: none; }
    .header-caption > p {
      font-size: 15px;
      font-weight: 300;
      color: #eee;
      letter-spacing: 1px;
      margin-bottom: 30px;
    }

    /* ── ABOUT / WHO WE ARE ── */
    .hero-intro { max-width: 700px; margin: 0 auto 80px; text-align: center; }
    .hero-intro h3 { margin-bottom: 10px; }
    .hero-intro h4 {
      position: relative;
      padding-bottom: 30px;
      margin-bottom: 30px;
      font-weight: 500;
      font-size: 22px;
    }
    .hero-intro h4::after {
      content: '';
      width: 60px; height: 2px;
      background: #2AAFC0;
      position: absolute;
      bottom: 0; left: calc(50% - 30px);
    }

    .hero-icon-card { text-align: center; padding: 30px 15px; }
    .hero-icon-card .icon-circle {
      width: 80px; height: 80px;
      border: 1px solid #eee;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 40px;
      position: relative;
      color: #2AAFC0;
    }
    .hero-icon-card .icon-circle::after {
      content: '';
      width: 20px; height: 1px;
      background: #2AAFC0;
      position: absolute;
      left: calc(50% - 10px); bottom: -20px;
    }
    .hero-icon-card h5 { margin-bottom: 15px; font-weight: 500; font-size: 20px; }

    /* ── SECTION BOX / SKILLS ── */
    .half-bg-img {
      background-size: cover;
      background-position: center;
      min-height: 500px;
    }
    .box-white {
      padding: 100px 10%;
      background: #fff;
      box-shadow: 0px 8px 30px rgba(0,0,0,0.08);
      height: 100%;
    }
    .box-white .section-head { text-align: left; margin-bottom: 40px; }
    .box-white .section-head h6 { padding-left: 0; }
    .box-white .section-head h6::before { display: none; }
    .box-white .section-head h6::after { right: auto; left: 0; bottom: 3px; }

    .skill-item { margin-bottom: 30px; }
    .skill-item:last-child { margin-bottom: 0; }
    .skill-item h6 { font-size: 14px; margin-bottom: 10px; }
    .skill-progress {
      width: 100%; height: 26px;
      border: 4px solid #f7f7f7;
      background: #f7f7f7;
      border-radius: 20px;
      position: relative;
      box-shadow: 0px -10px 30px rgba(0,0,0,0.08) inset;
    }
    .skill-progress .progres {
      position: absolute;
      height: 100%; left: 0; top: 0;
      background: linear-gradient(to right, #2AAFC0, #6976c5);
      border-radius: 20px;
    }
    .skill-progress .progres::before {
      content: attr(data-value);
      padding: 4px 10px 3px;
      border-radius: 10px;
      font-size: 10px; color: #fff;
      background: linear-gradient(to right, #2AAFC0, #6976c5);
      position: absolute;
      top: -35px; right: 0;
    }
    .skill-progress .progres::after {
      content: '';
      width: 0; height: 0;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 5px solid #2AAFC0;
      position: absolute;
      top: -12px; right: 15px;
    }

    /* ── SERVICES ── */
    .services .item {
      text-align: center;
      padding: 30px 15px;
    }
    .services .item .svc-icon {
      color: #2AAFC0;
      margin-bottom: 15px;
      display: flex; align-items: center; justify-content: center;
    }
    .services .item h6 { margin-bottom: 10px; font-weight: 500; }
    .services .bord {
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
    }
    .services .svc-hr {
      height: 1px; width: 100%;
      border: 0; display: block;
      background: #eee; margin: 0;
    }

    /* ── NUMBERS ── */
    .numbers-section {
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      position: relative;
    }
    .numbers-section::before {
      content: '';
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.7); z-index: 1;
    }
    .numbers-section .arco-container { position: relative; z-index: 2; }
    .number-item { text-align: center; padding: 0 15px; }
    .number-item .num-icon {
      color: #2AAFC0;
      margin-bottom: 30px;
      display: flex; align-items: center; justify-content: center;
    }
    .number-item h3 {
      font-size: 55px; font-weight: 700;
      margin-bottom: 30px; color: #fff;
    }
    .number-item h6 { font-weight: 300; color: #eee; }

    /* ── WORKS / PORTFOLIO ── */
    .works-filtering {
      display: inline-block;
      padding: 2px 10px;
      border: 1px solid #eee;
      border-radius: 30px;
      margin-bottom: 30px;
    }
    .works-filtering span {
      margin: 0 5px; padding: 8px 15px;
      border-radius: 30px; cursor: pointer;
      display: inline-block; font-size: 13px;
      transition: all .3s;
    }
    .works-filtering .active {
      background: linear-gradient(to right, #2AAFC0, #6976c5);
      box-shadow: 0px 8px 30px rgba(0,0,0,0.2);
      color: #fff;
    }
    .work-item {
      position: relative;
      margin-top: 30px;
      overflow: hidden;
    }
    .work-item:hover .work-overlay {
      transform: scale(1, 1);
      opacity: 1;
    }
    .work-overlay {
      position: absolute;
      top: 10px; left: 10px; right: 10px; bottom: 10px;
      background: rgba(255,255,255,0.95);
      opacity: 0;
      transform: scale(0, 0);
      transition: all .5s;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
    }
    .work-overlay::after {
      content: '';
      position: absolute;
      top: -5px; bottom: -5px; left: -5px; right: -5px;
      background: rgba(255,255,255,0.5);
      z-index: -1;
    }
    .work-overlay p { color: #2AAFC0; font-weight: 400; margin-bottom: 5px; }
    .work-overlay h6 { font-weight: 500; font-size: 17px; letter-spacing: 1px; }

    /* ── TEAM ── */
    .team-item {
      border: 1px solid rgba(42,175,192,0.3);
      border-radius: 100px;
      overflow: hidden;
      position: relative;
      transition: background .4s;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
    }
    .team-item:hover {
      background: linear-gradient(to right, #2AAFC0, #6976c5);
    }
    .team-item:hover .team-name { color: #fff; }
    .team-item:hover .team-role { color: #eee !important; }
    .team-item:hover p { color: #ccc; }
    .team-item:hover .team-img-wrap { border-color: #2AAFC0; }
    .team-img-wrap {
      flex-shrink: 0;
      width: 170px; height: 170px;
      border: 5px solid #fff;
      border-radius: 50%;
      overflow: hidden;
      transition: border-color .4s;
    }
    .team-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .team-info {
      padding: 15px 15px 15px 20px;
      flex: 1;
    }
    .team-name { font-size: 16px; font-weight: 500; letter-spacing: 1px; margin-bottom: 5px; }
    .team-role { font-size: 13px; color: #2AAFC0; display: block; margin-bottom: 10px; }
    .team-socials { display: flex; gap: 8px; margin-top: 8px; }
    .team-social-icon {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: rgba(42,175,192,0.1);
      display: flex; align-items: center; justify-content: center;
      transition: background .3s;
      cursor: pointer;
    }
    .team-social-icon:hover { background: #2AAFC0; }

    /* ── PRICING ── */
    .pricing-tables { padding: 0 50px; }
    .price-item {
      padding: 30px;
      background: #fff;
      box-shadow: 0px 8px 30px rgba(0,0,0,0.1);
      border-radius: 10px;
    }
    .price-item .type {
      position: relative;
      padding-bottom: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    .price-item .type h4 { font-size: 20px; font-weight: 500; }
    .price-item .value { margin: 30px 0; }
    .price-item .value h3 { font-size: 55px; }
    .price-item .value h3 span { font-size: 15px; }
    .price-item .value .per { font-size: 13px; margin-top: 5px; color: #2AAFC0; }
    .price-item .features { text-align: left; padding: 15px 0; }
    .price-item .features li {
      margin-bottom: 15px;
      font-size: 15px; font-weight: 300; color: #7f7f7f;
    }
    .price-item .features li:last-child { margin-bottom: 0; }
    .price-item .order { margin-top: 30px; }
    .price-item .order .butn { box-shadow: none; margin-left: 0; }

    .price-item.active {
      color: #fff;
      position: relative;
      transform: scale(1.05, 1.05);
      z-index: 2;
      overflow: hidden;
    }
    .price-item.active::after {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: linear-gradient(to bottom, #2AAFC0, #6976c5);
      z-index: -1;
      opacity: .9;
    }
    .price-item.active .type h4 { color: #fff; }
    .price-item.active .value h3 { color: #fff; }
    .price-item.active .value .per { color: #eee; }
    .price-item.active .features li { color: #fff; }

    /* ── TESTIMONIALS ── */
    .testi-section {
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      position: relative;
      padding: 120px 0;
    }
    .testi-section::before {
      content: '';
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.75); z-index: 1;
    }
    .testi-section .arco-container { position: relative; z-index: 2; }
    .testi-intro-h5 {
      font-weight: 400;
      margin-bottom: 80px;
      color: #fff;
    }
    .testi-item { text-align: center; padding: 0 15px; }
    .client-img {
      width: 90px; height: 90px;
      margin: 0 auto 15px;
      border-radius: 50%; overflow: hidden;
      border: 5px solid rgba(200,200,200,0.15);
    }
    .client-img img { width: 100%; height: 100%; object-fit: cover; }
    .testi-item h6 {
      font-size: 16px; font-weight: 500;
      letter-spacing: 1px; margin-bottom: 30px; color: #fff;
    }
    .testi-item h6 span {
      display: block; color: #2AAFC0;
      font-size: 14px; font-weight: 400; margin-top: 5px;
    }
    .testi-item p {
      padding: 30px; color: #eee; font-size: 18px;
      background: linear-gradient(to right, transparent, rgba(200,200,200,0.1), transparent);
    }

    /* ── BLOG ── */
    .blog-card {
      box-shadow: 0px 8px 30px rgba(0,0,0,0.08);
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 30px;
    }
    .blog-post-img { padding: 15px; }
    .blog-post-img .img-wrap { overflow: hidden; }
    .blog-post-img .img-wrap img { transition: all .5s; }
    .blog-post-img:hover .img-wrap img { transform: scale(1.1, 1.1); }
    .blog-cont { padding: 15px 15px 30px; }
    .blog-info { margin-bottom: 10px; }
    .blog-info a { color: #999; font-size: 12px; margin: 0 5px 5px; }
    .blog-card h6 { font-size: 20px; font-weight: 500; margin-bottom: 20px; }

    /* ── SUBSCRIBE ── */
    .subscribe-section {
      background: linear-gradient(to right, #2AAFC0, #6976c5);
      background-size: auto;
      background-repeat: repeat;
      padding: 120px 0;
      text-align: center;
    }
    .subscribe-section h4 { font-weight: 500; margin-bottom: 50px; color: #fff; }
    .sub-form-wrap { position: relative; max-width: 600px; margin: 0 auto; }
    .sub-input {
      padding: 14px 10px;
      width: 100%;
      border: 0;
      background: #fff;
      border-radius: 30px;
      box-shadow: 0px 10px 30px rgba(0,0,0,0.1);
      font-family: 'Rubik', sans-serif;
      font-size: 14px;
      padding-right: 160px;
    }
    .sub-btn {
      cursor: pointer;
      padding: 10px 0;
      width: 140px;
      border: 1px solid transparent;
      border-radius: 30px;
      position: absolute;
      top: 4px; right: -6px;
      box-shadow: 0px 10px 30px rgba(0,0,0,0.1);
      background: linear-gradient(to right, #2AAFC0, #6976c5);
      color: #fff;
      font-family: 'Rubik', sans-serif;
      font-size: 13px; font-weight: 500;
      transition: border-color .3s;
    }
    .sub-btn:hover { border-color: #2AAFC0; }

    /* ── CLIENT LOGOS ── */
    .clients-logo-row {
      display: flex; align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
    .client-logo-item {
      padding: 0 30px;
      opacity: 0.4; transition: opacity .3s;
    }
    .client-logo-item:hover { opacity: 1; }
    .client-logo-item img { max-height: 50px; width: auto; margin: 0 auto; }

    /* ── CONTACT INFO ── */
    .contact-info-section { padding: 100px 5%; }
    .contact-info-item {
      display: flex; gap: 20px;
      align-items: flex-start;
      margin-bottom: 50px;
    }
    .contact-info-icon { color: #2AAFC0; flex-shrink: 0; }
    .contact-info-item h6 {
      font-size: 14px; font-weight: 500;
      letter-spacing: 1px; margin-bottom: 5px;
    }
    .social-links { display: flex; gap: 5px; margin-top: 10px; }
    .social-icon {
      width: 35px; height: 35px;
      border-radius: 50%;
      background: rgba(200,200,200,0.1);
      display: flex; align-items: center; justify-content: center;
      color: #fff; transition: background .3s; cursor: pointer;
    }
    .social-icon:hover { background: #2AAFC0; }

    /* ── CONTACT FORM ── */
    .contact-form input,
    .contact-form textarea {
      width: 100%;
      padding: 15px;
      background: #F7F7F7;
      border: 0;
      border-radius: 10px;
      font-family: 'Rubik', sans-serif;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .contact-form textarea {
      height: 140px; max-height: 140px;
      max-width: 100%; resize: vertical;
    }
    .contact-form-row {
      display: flex; gap: 20px; margin-bottom: 0;
    }
    .contact-form-row input { margin-bottom: 20px; }
    .contact-submit {
      font-size: 16px; font-weight: 500;
      width: 100%; padding: 10px;
      color: #fff;
      background: linear-gradient(to right, #2AAFC0, #6976c5);
      box-shadow: 0px 10px 30px rgba(0,0,0,0.2);
      border: 0; border-radius: 30px;
      cursor: pointer;
      font-family: 'Rubik', sans-serif;
      transition: background .3s;
    }
    .contact-submit:hover { background: #2AAFC0; }

    /* ── FOOTER ── */
    .arco-footer { background: #111; padding: 80px 0; text-align: center; }
    .arco-footer .footer-logo {
      font-size: 28px; font-weight: 700;
      color: #fff; letter-spacing: 3px;
      margin-bottom: 15px; display: block;
    }
    .arco-footer .social a {
      color: #fff; font-size: 13px;
      width: 35px; height: 35px;
      border-radius: 50%;
      background: #222;
      margin: 15px 5px;
      display: inline-flex;
      align-items: center; justify-content: center;
      transition: background .3s;
    }
    .arco-footer .social a:hover { background: #2AAFC0; }
    .arco-footer p {
      color: #999; font-weight: 400;
      font-size: 12px; text-transform: uppercase;
      letter-spacing: 2px; margin-top: 20px;
    }

    /* ── RESPONSIVE ── */
    @media screen and (max-width: 991px) {
      .col-6, .col-4, .col-3 { width: 100%; }
      .services .bord { border: 0; }
      .services .svc-hr { display: none; }
      .pricing-tables { padding: 0; }
      .price-item.active { transform: none; }
      .team-item { border-radius: 20px; }
    }
    @media screen and (max-width: 767px) {
      .header-caption h1 { font-size: 35px; }
      .subscribe-section h4 { font-size: 20px; margin-bottom: 30px; }
      .sub-form-wrap { padding: 0 20px; }
    }
    @media screen and (max-width: 480px) {
      .team-item {
        flex-direction: column; border-radius: 20px;
        padding: 30px; text-align: center;
      }
      .team-img-wrap { margin: 0 auto 20px; }
      .pricing-tables { padding: 0 10px; }
    }
  `}</style>
);

/* ─── SVG Icons (Material Design filled — matching Font Awesome style of original) ─── */
const Icon = ({ name, size = 24, color = "#2AAFC0" }) => {
  const d = {
    palette:  "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5S18.33 12 17.5 12z",
    eye:      "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
    tune:     "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z",
    phone_iphone: "M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5S10.67 20 11.5 20s1.5.67 1.5 1.5S12.33 22 11.5 22zm4.5-4H7V4h9v14z",
    desktop:  "M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z",
    headset:  "M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z",
    star:     "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    code:     "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
    brush:    "M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z",
    phone:    "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
    location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    email:    "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    fb:       "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z",
    tw:       "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
    ig:       "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    li:       "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={color}>
      <path d={d[name] || d.palette} />
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
const NAV_ITEMS = ["Home","About","Services","Portfolio","Price","Blog","Contact"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("Home");

  useEffect(() => {
    const ids = ["home","about","services","portfolio","price","blog","contact"];
    const handler = () => {
      setScrolled(window.scrollY > 60);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 90) { setActive(NAV_ITEMS[i]); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const go = (item) => {
    const id = item.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(item);
  };

  return (
    <nav className={`arco-navbar${scrolled ? " nav-scroll" : ""}`}>
      <div className="navbar-inner">
        <div className="logo" onClick={() => go("Home")}>
          <img
            src="https://uithemez.com/i/arco/img/logo-light.png"
            alt="Arco"
            onError={e => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML =
                `<span style="font-size:22px;font-weight:700;color:${scrolled?"#111":"#fff"};letter-spacing:2px">ARCO</span>`;
            }}
          />
        </div>
        <div className="navbar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              className={`nav-link${active === item ? " active" : ""}`}
              onClick={() => go(item)}
            >{item}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════════ */
function Header() {
  return (
    <section
      id="home"
      className="arco-header"
      style={{ backgroundImage: "url('https://uithemez.com/i/arco/img/slider/1.jpg')" }}
    >
      <div className="arco-container">
        <div className="header-caption">
          <h4>We Are Creative</h4>
          <h1>Creative Digital Agency</h1>
          <div className="dots-line">
            <span>Design</span>
            <span>Branding</span>
            <span>Development</span>
          </div>
          <p>A single place to share, curate and discover visual that tells a story.</p>
          <button className="butn butn-bg" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}>
            <span>Learn More</span>
          </button>
          <button className="butn butn-light" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>
            <span>Get Started</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="section-padding">
      <div className="arco-container">
        {/* Intro */}
        <div className="hero-intro">
          <h3>Welcome To Our Agency</h3>
          <h4>Who We Are And What Can We do?</h4>
          <p>
            We're full service which means we've got you covered on design and content right through to
            digital. You'll form a lasting relationship with us, collaboration is central to everything we do.
            We'll push you out of your comfort zone from time-to-time, but this is where you'll shine.
            Bottom line is we want you to succeed at Faculty.
          </p>
        </div>
        {/* 3 icon cards */}
        <div className="arco-row" style={{ justifyContent:"center" }}>
          {[
            { icon:"palette",  title:"Creative Design",  desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
            { icon:"tune",     title:"Branding",          desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
            { icon:"desktop",  title:"Web Development",   desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="col-4 text-center">
              <div className="hero-icon-card">
                <div className="icon-circle">
                  <Icon name={icon} size={38} color="#2AAFC0" />
                </div>
                <h5>{title}</h5>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKILLS SECTION BOX
═══════════════════════════════════════════════════════════════ */
function SkillsBox() {
  return (
    <section style={{ background:"#f7f7f7" }}>
      <div className="arco-row" style={{ margin:0 }}>
        {/* left: bg image */}
        <div className="col-6" style={{ padding:0 }}>
          <div
            className="half-bg-img"
            style={{ backgroundImage:"url('https://uithemez.com/i/arco/img/about/1.jpg')" }}
          />
        </div>
        {/* right: skills */}
        <div className="col-6" style={{ padding:0 }}>
          <div className="box-white">
            <div className="section-head" style={{ textAlign:"left", marginBottom:40 }}>
              <h6>We Strive To Be The Best</h6>
              <h4 style={{ marginTop:15 }}>We strive to be the best and make Awesome Work.</h4>
              <p style={{ marginTop:15 }}>
                Lorem Ipsum is simply dummy text of the printing and type setting industry when an unknown
                printer took a galley of type and scrambled it to make a type specimen book It has survived
                not only five centuries.
              </p>
            </div>
            {[
              { label:"Web Design",  val:"85%", w:85 },
              { label:"Branding",    val:"72%", w:72 },
              { label:"Development", val:"90%", w:90 },
            ].map(({ label, val, w }) => (
              <div key={label} className="skill-item">
                <h6>{label}</h6>
                <div className="skill-progress">
                  <div className="progres" data-value={val} style={{ width:`${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════════ */
function Services() {
  const rows = [
    [
      { icon:"palette",  title:"Creative Design",  desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
      { icon:"eye",      title:"User Experience",   desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
      { icon:"tune",     title:"Customizability",   desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
    ],
    [
      { icon:"desktop",  title:"Retina Ready",      desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
      { icon:"phone_iphone", title:"Fully Responsive", desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
      { icon:"headset",  title:"Custom Support",    desc:"Lorem Ipsum simply dummy text of the printing and type setting industry when an unknown printing simply dummy" },
    ],
  ];
  return (
    <section id="services" className="section-padding bg-gray">
      <div className="arco-container">
        <div className="section-head">
          <h6>Awesome Features</h6>
          <h4>Our Services</h4>
        </div>
        <div className="services">
          {rows.map((row, ri) => (
            <div key={ri}>
              {ri === 1 && <div className="svc-hr" />}
              <div className="arco-row">
                {row.map(({ icon, title, desc }, i) => (
                  <div key={title} className={`col-4${i === 1 ? " bord" : ""}`}>
                    <div className="item">
                      <div className="svc-icon"><Icon name={icon} size={40} color="#2AAFC0" /></div>
                      <h6>{title}</h6>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NUMBERS
═══════════════════════════════════════════════════════════════ */
function Numbers() {
  return (
    <section
      className="numbers-section section-padding"
      style={{ backgroundImage:"url('https://uithemez.com/i/arco/img/numbers.jpg')" }}
    >
      <div className="arco-container">
        <div className="arco-row">
          {[
            { icon:"palette",  num:"368",  label:"Happy Clients" },
            { icon:"brush",    num:"937",  label:"Projects Completed" },
            { icon:"code",     num:"438",  label:"Files Downloaded" },
            { icon:"desktop",  num:"5946", label:"Lines Of Code" },
          ].map(({ icon, num, label }) => (
            <div key={label} className="col-3 text-center">
              <div className="number-item">
                <div className="num-icon"><Icon name={icon} size={45} color="#2AAFC0" /></div>
                <h3>{num}</h3>
                <h6>{label}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO / WORKS
═══════════════════════════════════════════════════════════════ */
const PORTS = [
  { src:"https://uithemez.com/i/arco/img/portfolio/1.jpg", cat:"Brand",   label:"Logo & Branding", title:"Creative Design" },
  { src:"https://uithemez.com/i/arco/img/portfolio/2.jpg", cat:"Design",  label:"Logo & Branding", title:"Creative Design" },
  { src:"https://uithemez.com/i/arco/img/portfolio/3.jpg", cat:"Graphic", label:"Logo & Branding", title:"Creative Design" },
  { src:"https://uithemez.com/i/arco/img/portfolio/4.jpg", cat:"Brand",   label:"Logo & Branding", title:"Creative Design" },
  { src:"https://uithemez.com/i/arco/img/portfolio/5.jpg", cat:"Design",  label:"Logo & Branding", title:"Creative Design" },
  { src:"https://uithemez.com/i/arco/img/portfolio/6.jpg", cat:"Graphic", label:"Logo & Branding", title:"Creative Design" },
  { src:"https://uithemez.com/i/arco/img/portfolio/7.jpg", cat:"Brand",   label:"Logo & Branding", title:"Creative Design" },
  { src:"https://uithemez.com/i/arco/img/portfolio/8.jpg", cat:"Design",  label:"Logo & Branding", title:"Creative Design" },
];

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? PORTS : PORTS.filter(p => p.cat === filter);
  return (
    <section id="portfolio" className="section-padding">
      <div className="arco-container">
        <div className="section-head">
          <h6>Latest Projects</h6>
          <h4>Creative Portfolio</h4>
        </div>
        <div className="text-center">
          <div className="works-filtering">
            {["All","Brand","Design","Graphic"].map(f => (
              <span key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</span>
            ))}
          </div>
        </div>
        <div className="arco-row">
          {visible.map((item, i) => (
            <div key={i} className="col-3">
              <div className="work-item">
                <img
                  src={item.src} alt={item.title}
                  style={{ display:"block", width:"100%", minHeight:180, background:"#eee" }}
                  onError={e => { e.target.style.minHeight="180px"; e.target.style.background="#ddd"; }}
                />
                <div className="work-overlay">
                  <p>{item.label}</p>
                  <h6>{item.title}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TEAM  — horizontal pill layout from source CSS
═══════════════════════════════════════════════════════════════ */
function Team() {
  return (
    <section className="section-padding bg-gray">
      <div className="arco-container">
        <div className="section-head">
          <h6>The Talent Crew</h6>
          <h4>Our Team</h4>
        </div>
        <div className="arco-row">
          {[1,2,3,4].map(n => (
            <div key={n} className="col-6">
              <div className="team-item">
                <div className="team-img-wrap">
                  <img
                    src={`https://uithemez.com/i/arco/img/team/${n}.jpg`}
                    alt="Team member"
                    onError={e => { e.target.style.background="#bbb"; e.target.src=""; }}
                  />
                </div>
                <div className="team-info">
                  <h6 className="team-name">Alex Smith</h6>
                  <span className="team-role">Project Manager</span>
                  <p>Lorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                  <div className="team-socials">
                    {["fb","tw","ig"].map(s => (
                      <div key={s} className="team-social-icon">
                        <Icon name={s} size={14} color="#2AAFC0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════════════ */
function Pricing() {
  const plans = [
    { name:"Basic",    price:"10", active:false, features:["10 GB Disk Space","15 Domain Names","4 Email Address","Enhanced Security","Unlimited Support"] },
    { name:"Standard", price:"30", active:true,  features:["100 GB Disk Space","30 Domain Names","5 Email Address","Enhanced Security","Unlimited Support"] },
    { name:"Premium",  price:"80", active:false, features:["500 GB Disk Space","100 Domain Names","10 Email Address","Enhanced Security","Unlimited Support"] },
  ];
  return (
    <section id="price" className="section-padding">
      <div className="arco-container">
        <div className="section-head">
          <h6>Choose Our Offers</h6>
          <h4>Our Pricing</h4>
        </div>
        <div className="pricing-tables">
          <div className="arco-row" style={{ alignItems:"center" }}>
            {plans.map(({ name, price, active, features }) => (
              <div key={name} className="col-4">
                <div className={`price-item${active ? " active" : ""}`}>
                  <div className="type"><h4>{name}</h4></div>
                  <div className="value">
                    <h3><span>$</span>{price}</h3>
                    <div className="per">Per Of Month</div>
                  </div>
                  <div className="features">
                    <ul>{features.map(f => <li key={f}>{f}</li>)}</ul>
                  </div>
                  <div className="order">
                    <button className={`butn ${active ? "butn-light" : "butn-bg"}`}>
                      <span>Purchase Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
function Testimonials() {
  return (
    <section
      className="testi-section text-center"
      style={{ backgroundImage:"url('https://uithemez.com/i/arco/img/testim.jpg')" }}
    >
      <div className="arco-container">
        <div className="section-head" style={{ marginBottom:30 }}>
          <h6 style={{ color:"#eee" }}>Client Feedback</h6>
        </div>
        <h5 className="testi-intro-h5">What Our Clients Say</h5>
        <div className="arco-row">
          {[
            { img:"https://uithemez.com/i/arco/img/clients/1.jpg", name:"Sam Martin", role:"Envato Customer" },
            { img:"https://uithemez.com/i/arco/img/clients/2.jpg", name:"Sam Martin", role:"Envato Customer" },
            { img:"https://uithemez.com/i/arco/img/clients/3.jpg", name:"Sam Martin", role:"Envato Customer" },
          ].map(({ img, name, role }, i) => (
            <div key={i} className="col-4">
              <div className="testi-item">
                <div className="client-img">
                  <img src={img} alt={name} onError={e => { e.target.style.display="none"; }} />
                </div>
                <h6>{name}<span>{role}</span></h6>
                <p>Lorem Ipsum is simply dummy text of the printing and type setting industry when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BLOG
═══════════════════════════════════════════════════════════════ */
function Blog() {
  return (
    <section id="blog" className="section-padding">
      <div className="arco-container">
        <div className="section-head">
          <h6>Latest News</h6>
          <h4>Our Blog</h4>
        </div>
        <div className="arco-row">
          {[1,2,3].map(n => (
            <div key={n} className="col-4">
              <div className="blog-card">
                <div className="blog-post-img">
                  <div className="img-wrap">
                    <img
                      src={`https://uithemez.com/i/arco/img/blog/${n}.jpg`}
                      alt="blog"
                      onError={e => { e.target.style.minHeight="160px"; e.target.style.background="#eee"; }}
                    />
                  </div>
                </div>
                <div className="blog-cont">
                  <div className="blog-info">
                    <a href="#">By : Admin</a>
                    <a href="#">06 Aug 2017</a>
                    <a href="#">WordPress</a>
                  </div>
                  <h6>48 Best WordPress Themes</h6>
                  <p>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the dummy text ever</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBSCRIBE  — pill input with absolute gradient button
═══════════════════════════════════════════════════════════════ */
function Subscribe() {
  return (
    <section className="subscribe-section">
      <div className="arco-container">
        <h4>Join To Our Newsletter</h4>
        <div className="sub-form-wrap">
          <input className="sub-input" type="email" placeholder="Enter Your Email..." />
          <button className="sub-btn">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLIENT LOGOS
═══════════════════════════════════════════════════════════════ */
function ClientLogos() {
  return (
    <section className="section-padding bg-gray">
      <div className="arco-container">
        <div className="clients-logo-row">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className="client-logo-item">
              <img
                src="https://uithemez.com/i/arco/img/clients-logo/1.png"
                alt={`client ${n}`}
                onError={e => { e.target.style.display="none"; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="arco-container">
        <div className="section-head">
          <h6>Feel Free To Contact Us</h6>
          <h4>Get In Touch</h4>
        </div>
        <div className="arco-row">
          {/* Info */}
          <div className="col-6">
            <div className="contact-info-section" style={{ padding:"0 5% 0 0" }}>
              {[
                { icon:"phone",    label:"Phone :",   val:"+ 20 010 2517 8918" },
                { icon:"location", label:"Address :",  val:"75 New York - Bourbon Street 10/555\n3rd Avenue, Upper East Side, San Francisco" },
                { icon:"email",    label:"Email :",    val:"email@youradress.com\nemail_support@youradress.com" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon name={icon} size={35} color="#2AAFC0" />
                  </div>
                  <div>
                    <h6>{label}</h6>
                    <p style={{ whiteSpace:"pre-line" }}>{val}</p>
                  </div>
                </div>
              ))}
              <div className="social-links">
                {["fb","tw","ig","li"].map(s => (
                  <div key={s} className="social-icon">
                    <Icon name={s} size={15} color="#fff" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="col-6">
            <div className="contact-form">
              <div className="contact-form-row">
                <input placeholder="Your Name" />
                <input placeholder="Your Email" type="email" />
              </div>
              <input placeholder="Subject" />
              <textarea placeholder="Your Message..." />
              <button className="contact-submit">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="arco-footer">
      <div className="arco-container">
        <img
          src="https://uithemez.com/i/arco/img/logo-light.png"
          alt="Arco"
          style={{ maxWidth:120, margin:"0 auto 15px" }}
          onError={e => {
            e.target.style.display = "none";
            const s = document.createElement("span");
            s.className = "footer-logo";
            s.textContent = "ARCO";
            e.target.parentNode.insertBefore(s, e.target.nextSibling);
          }}
        />
        <div className="social">
          {["fb","tw","ig","li"].map(s => (
            <a key={s} href="#">
              <Icon name={s} size={14} color="#fff" />
            </a>
          ))}
        </div>
        <p>© 2018 UI-ThemeZ. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function ArcoLanding() {
  return (
    <>
      <G />
      <Navbar />
      <Header />
      <About />
      <SkillsBox />
      <Services />
      <Numbers />
      <Portfolio />
      <Team />
      <Pricing />
      <Testimonials />
      <Blog />
      <Subscribe />
      <ClientLogos />
      <Contact />
      <Footer />
    </>
  );
}
