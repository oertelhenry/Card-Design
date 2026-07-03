import React, { useState } from "react";
import {
  Smartphone,
  QrCode,
  Nfc,
  Image as ImageIcon,
  Palette,
  Globe,
  ClipboardList,
  BarChart3,
  Settings,
  Bell,
  ShieldCheck,
  Car,
  Phone,
  MapPin,
  Tag,
  Shield,
  Clock,
  Mail,
  ArrowRight,
  Compass,
  Check,
  RefreshCw,
  Layers,
} from "lucide-react";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import homeBannerImg from "./images/HomeBanner.jpg";
import businessCardsBannerImg from "./images/BusinessCardsBanner.jpg";
import surveyBannerImg from "./images/SurveyBanner.jpg";
import vehicleBannerImg from "./images/VehicleBanner.jpg";
import businessLowerImg from "./images/BusinessLower.jpg";
import surveyLowerImg from "./images/SurveyLower.jpg";
import vehicleLowerImg from "./images/VehicleLower.jpg";

/* ------------------------------------------------------------------ */
/*  This file is 100% self-contained: all styling lives in the        */
/*  <GlobalStyles> component below as plain CSS. No Tailwind, no      */
/*  build step, no external stylesheet required — just React +       */
/*  lucide-react. Drop the /images folder next to this file.          */
/* ------------------------------------------------------------------ */

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

      .cz-root, .cz-root * { box-sizing: border-box; }
      .cz-root :where(button, input, textarea) {
        all: unset;
        box-sizing: border-box;
        font-family: inherit;
      }
      .cz-root button { cursor: pointer; }
      .cz-root ul { list-style: none; margin: 0; padding: 0; }
      .cz-root a { text-decoration: none; color: inherit; cursor: pointer; }
      .cz-root img { display: block; max-width: 100%; }
      .cz-root p, .cz-root h1, .cz-root h2, .cz-root h3 { margin: 0; }

      .cz-root {
        font-family: 'Inter', system-ui, sans-serif;
        background: #FCF8F1;
        min-height: 100vh;
        color: #1D0000;
        display: flex;
        flex-direction: column;
      }
      .cz-page-main { flex: 1 0 auto; }
      .cz-display { font-family: 'Playfair Display', Georgia, serif; }

      /* ---------- Header ---------- */
      .cz-header { width: 100%; z-index: 30; position: sticky; top: 0; }
      .cz-header--solid { background: #F5F0E9; border-bottom: 1px solid rgba(0,0,0,0.06); }
      .cz-header--transparent { background: transparent; }
      .cz-header-inner {
        max-width: 1400px; margin: 0 auto;
        display: flex; align-items: center; justify-content: space-between;
        padding: 16px 40px;
      }
      .cz-logo { font-size: 24px; font-weight: 700; letter-spacing: -0.01em; transition: opacity .15s ease; }
      .cz-logo:hover { opacity: 0.8; }
      .cz-logo--transparent { color: #ffffff; }
      .cz-logo--solid { color: #1D0000; }

      .cz-nav { display: flex; align-items: center; gap: 32px; }
      .cz-nav-link { font-size: 14px; font-weight: 500; transition: color .15s ease; white-space: nowrap; }
      .cz-nav-link--transparent { color: rgba(255,255,255,0.9); }
      .cz-nav-link--transparent:hover { color: #ffffff; }
      .cz-nav-link--solid { color: #57493F; }
      .cz-nav-link--solid:hover { color: #1D0000; }

      .cz-btn-get-started {
        border-radius: 9999px; padding: 11px 22px; font-size: 14px; font-weight: 600;
        transition: background-color .15s ease;
      }
      .cz-btn-get-started--transparent { background: #ffffff; color: #1D0000; }
      .cz-btn-get-started--transparent:hover { background: #efefef; }
      .cz-btn-get-started--solid { background: #B54700; color: #ffffff; }
      .cz-btn-get-started--solid:hover { background: #9c3d00; }

      @media (max-width: 1023px) {
        .cz-nav { display: none; }
      }
      @media (max-width: 640px) {
        .cz-header-inner { padding: 14px 20px; }
      }

      /* ---------- Buttons (shared) ---------- */
      .cz-btn-pill {
        display: inline-flex; align-items: center; gap: 8px;
        border-radius: 9999px; font-size: 14px; font-weight: 600;
        padding: 14px 26px; transition: background-color .15s ease, border-color .15s ease;
      }
      .cz-btn-pill--orange { background: #B54700; color: #ffffff; }
      .cz-btn-pill--orange:hover { background: #9c3d00; }
      .cz-btn-pill--dark-outline { background: rgba(0,0,0,0.2); color: #ffffff; border: 1px solid rgba(255,255,255,0.25); }
      .cz-btn-pill--dark-outline:hover { background: rgba(0,0,0,0.35); }

      /* ---------- Home hero ---------- */
      .cz-home-hero { position: relative; height: 820px; max-height: 100vh; min-height: 620px; overflow: hidden; }
      .cz-home-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .cz-home-hero-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(90deg, rgba(20,10,5,0.88) 0%, rgba(20,10,5,0.65) 40%, rgba(20,10,5,0.25) 75%, rgba(20,10,5,0.05) 100%);
      }
      .cz-home-hero-content {
        position: relative; z-index: 10; max-width: 1400px; margin: 0 auto;
        padding: 0 40px; height: calc(100% - 88px);
        display: flex; flex-direction: column; justify-content: center;
      }
      .cz-home-hero-inner { max-width: 640px; }
      .cz-home-h1 { font-size: 58px; font-weight: 700; color: #ffffff; line-height: 1.08; margin-bottom: 24px; }
      .cz-home-h1 .cz-accent { color: #F79971; }
      .cz-home-lead { color: rgba(255,255,255,0.85); font-size: 17px; line-height: 1.65; margin-bottom: 36px; max-width: 520px; }
      .cz-home-cta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-bottom: 64px; }
      .cz-home-trust-row { display: flex; flex-wrap: wrap; align-items: center; gap: 24px; color: rgba(255,255,255,0.7); font-size: 12px; }
      .cz-home-trust-item { display: inline-flex; align-items: center; gap: 6px; }

      @media (max-width: 767px) {
        .cz-home-h1 { font-size: 40px; }
        .cz-home-hero { height: 700px; }
        .cz-home-hero-content { padding: 0 20px; }
      }

      /* ---------- Card-type hero (Business/Survey/Vehicle) ---------- */
      .cz-cthero { position: relative; height: 420px; overflow: hidden; }
      .cz-cthero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .cz-cthero-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(90deg, rgba(29,0,0,0.93) 0%, rgba(29,0,0,0.82) 32%, rgba(29,0,0,0.45) 65%, rgba(29,0,0,0.18) 100%);
      }
      .cz-cthero-content { position: relative; z-index: 10; max-width: 1400px; margin: 0 auto; height: 100%; padding: 0 40px; display: flex; flex-direction: column; justify-content: center; }
      .cz-cthero-inner { max-width: 560px; }
      .cz-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.15em; color: #F79971; margin-bottom: 12px; }
      .cz-cthero-h1 { font-size: 44px; font-weight: 700; color: #ffffff; line-height: 1.1; margin-bottom: 16px; }
      .cz-cthero-h1 .cz-accent { color: #F79971; }
      .cz-cthero-lead { color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.6; margin-bottom: 28px; max-width: 420px; }

      @media (max-width: 767px) {
        .cz-cthero { height: 360px; }
        .cz-cthero-h1 { font-size: 32px; }
        .cz-cthero-content { padding: 0 20px; }
      }

      /* ---------- Feature section ---------- */
      .cz-section { background: #FCF8F1; padding: 80px 0; }
      .cz-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
      .cz-h2 { font-size: 34px; font-weight: 700; color: #1D0000; margin-bottom: 12px; }
      .cz-h2 .cz-accent { color: #B54700; }
      .cz-section-lead { color: #57493F; font-size: 15px; max-width: 640px; margin-bottom: 48px; }

      .cz-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
      @media (max-width: 1023px) { .cz-grid-3 { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 640px) { .cz-grid-3 { grid-template-columns: 1fr; } }

      .cz-card {
        background: #ffffff; border-radius: 16px; padding: 24px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        border: 1px solid transparent;
        transition: border-color .15s ease;
      }
      .cz-card:hover { border-color: #B54700; }
      .cz-card-icon {
        width: 44px; height: 44px; border-radius: 12px;
        background: #FFD8C5; color: #B54700;
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 20px; transition: background-color .15s ease, color .15s ease;
      }
      .cz-card:hover .cz-card-icon { background: #B54700; color: #ffffff; }
      .cz-card-title { font-size: 18px; font-weight: 600; color: #1D0000; margin-bottom: 8px; }
      .cz-card-text { font-size: 14px; line-height: 1.6; color: #57493F; }

      /* ---------- Showcase (card-type lower section) ---------- */
      .cz-showcase { background: #F3E6D2; padding: 96px 0; }
      .cz-showcase-container {
        max-width: 1400px; margin: 0 auto; padding: 0 40px;
        display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
      }
      .cz-showcase--reverse .cz-showcase-img-wrap { order: 2; }
      .cz-showcase--reverse .cz-showcase-content { order: 1; }
      .cz-showcase-img-wrap { border-radius: 16px; overflow: hidden; }
      .cz-showcase-img { width: 100%; height: auto; display: block; }
      .cz-showcase-lead { color: #57493F; font-size: 15px; line-height: 1.65; margin: 16px 0 24px; }
      .cz-showcase-checklist { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
      .cz-showcase-check-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #3a2f28; }
      .cz-showcase-check-item svg { color: #B54700; flex-shrink: 0; }
      .cz-btn-pill--dark-solid { background: #1D0000; color: #ffffff; }
      .cz-btn-pill--dark-solid:hover { background: #340606; }

      @media (max-width: 900px) {
        .cz-showcase-container { grid-template-columns: 1fr; gap: 32px; }
        .cz-showcase--reverse .cz-showcase-img-wrap { order: 0; }
        .cz-showcase--reverse .cz-showcase-content { order: 0; }
      }

      /* ---------- Pricing ---------- */
      .cz-pricing-section { background: #1D0000; padding: 80px 0 96px; }
      .cz-pricing-header { text-align: center; }
      .cz-pricing-h1 { font-size: 42px; font-weight: 700; color: #ffffff; line-height: 1.2; margin-bottom: 8px; }
      .cz-pricing-h1 .cz-accent { color: #B54700; }
      .cz-pricing-lead { color: rgba(255,255,255,0.6); font-size: 15px; margin-bottom: 56px; }

      .cz-pricing-grid {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        max-width: 960px; margin: 0 auto; text-align: left;
      }
      @media (max-width: 767px) { .cz-pricing-grid { grid-template-columns: 1fr; } }

      .cz-pcard { border-radius: 16px; padding: 32px; display: flex; flex-direction: column; position: relative; }
      .cz-pcard--plain { background: #FCF8F1; color: #1D0000; }
      .cz-pcard--featured { background: #B54700; color: #ffffff; box-shadow: 0 20px 40px rgba(0,0,0,0.35); }
      .cz-pcard--dark { background: rgba(255,255,255,0.04); color: #ffffff; border: 1px solid rgba(255,255,255,0.12); }
      @media (min-width: 768px) { .cz-pcard--featured { transform: translateY(-16px); } }

      .cz-pcard-badge {
        position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
        background: #ffffff; color: #1D0000; font-size: 12px; font-weight: 600;
        padding: 4px 12px; border-radius: 9999px;
      }
      .cz-pcard-plan { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
      .cz-pcard-desc { font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
      .cz-pcard--plain .cz-pcard-desc { color: #57493F; }
      .cz-pcard--featured .cz-pcard-desc { color: rgba(255,255,255,0.85); }
      .cz-pcard--dark .cz-pcard-desc { color: rgba(255,255,255,0.6); }
      .cz-pcard-price { margin-bottom: 24px; }
      .cz-pcard-price .amount { font-size: 36px; font-weight: 700; }
      .cz-pcard-price .period { font-size: 14px; margin-left: 4px; }
      .cz-pcard--plain .period { color: #57493F; }
      .cz-pcard--featured .period { color: rgba(255,255,255,0.7); }
      .cz-pcard--dark .period { color: rgba(255,255,255,0.5); }
      .cz-pcard-features { margin-bottom: 32px; flex: 1; display: flex; flex-direction: column; gap: 12px; }
      .cz-pcard-feature { display: flex; align-items: center; gap: 8px; font-size: 14px; }
      .cz-pcard-feature svg { color: #B54700; flex-shrink: 0; }
      .cz-pcard--featured .cz-pcard-feature svg { color: #ffffff; }
      .cz-pcard--plain .cz-pcard-feature span { color: #3a2f28; }
      .cz-pcard--featured .cz-pcard-feature span { color: rgba(255,255,255,0.9); }
      .cz-pcard--dark .cz-pcard-feature span { color: rgba(255,255,255,0.75); }
      .cz-pcard-cta { border-radius: 9999px; padding: 13px; font-size: 14px; font-weight: 600; text-align: center; transition: background-color .15s ease; }
      .cz-pcard--plain .cz-pcard-cta { background: #1D0000; color: #ffffff; }
      .cz-pcard--plain .cz-pcard-cta:hover { background: #340606; }
      .cz-pcard--featured .cz-pcard-cta { background: #ffffff; color: #B54700; }
      .cz-pcard--featured .cz-pcard-cta:hover { background: #f0f0f0; }
      .cz-pcard--dark .cz-pcard-cta { background: #000000; color: #ffffff; }
      .cz-pcard--dark .cz-pcard-cta:hover { background: #1a1a1a; }

      .cz-pricing-footnote { color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 56px; text-align: center; }
      .cz-pricing-footnote button { color: #F79971; font-weight: 500; }
      .cz-pricing-footnote button:hover { color: #ffb08a; }

      /* ---------- Contact ---------- */
      .cz-contact-section { background: #FCF8F1; padding: 64px 0 96px; }
      .cz-contact-header { text-align: center; }
      .cz-contact-h1 { font-size: 36px; font-weight: 700; color: #1D0000; margin-bottom: 12px; }
      .cz-contact-h1 .cz-accent { color: #B54700; }
      .cz-contact-lead { color: #57493F; font-size: 15px; margin-bottom: 56px; }

      .cz-contact-grid {
        display: grid; grid-template-columns: 340px 1fr; gap: 24px;
        max-width: 900px; margin: 0 auto; text-align: left;
      }
      @media (max-width: 767px) { .cz-contact-grid { grid-template-columns: 1fr; } }

      .cz-info-col { display: flex; flex-direction: column; gap: 24px; }
      .cz-info-card { background: #ffffff; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
      .cz-info-icon {
        width: 40px; height: 40px; border-radius: 12px; background: #FFD8C5; color: #B54700;
        display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
      }
      .cz-info-title { font-size: 16px; font-weight: 600; color: #1D0000; margin-bottom: 6px; }
      .cz-info-text { font-size: 14px; line-height: 1.6; color: #57493F; }
      .cz-info-text a { color: #2563eb; }
      .cz-info-text a:hover { text-decoration: underline; }

      .cz-form { background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
      .cz-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
      @media (max-width: 640px) { .cz-form-row { grid-template-columns: 1fr; } }
      .cz-form-group { margin-bottom: 20px; }
      .cz-form-label { display: block; font-size: 14px; font-weight: 500; color: #1D0000; margin-bottom: 6px; }
      .cz-input, .cz-textarea {
        width: 100%; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px;
        padding: 10px 12px; font-size: 14px; transition: border-color .15s ease;
      }
      .cz-input:focus, .cz-textarea:focus { border-color: #B54700; }
      .cz-textarea { resize: none; }
      .cz-char-count { text-align: right; font-size: 12px; color: #57493F; margin-top: 4px; }
      .cz-form-submit { margin-top: 16px; }

      /* ---------- Footer ---------- */
      .cz-footer { background: #1D0000; color: #ffffff; }
      .cz-footer-inner { max-width: 1400px; margin: 0 auto; padding: 64px 40px 32px; }
      .cz-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 40px; }
      @media (max-width: 900px) { .cz-footer-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 560px) { .cz-footer-grid { grid-template-columns: 1fr; } }

      .cz-footer-brand { font-size: 24px; font-weight: 700; margin-bottom: 16px; }
      .cz-footer-tagline { color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; max-width: 300px; margin-bottom: 20px; }
      .cz-footer-social { display: flex; align-items: center; gap: 12px; }
      .cz-social-btn {
        width: 36px; height: 36px; border-radius: 9999px; background: rgba(255,255,255,0.1);
        display: flex; align-items: center; justify-content: center; transition: background-color .15s ease;
      }
      .cz-social-btn:hover { background: rgba(255,255,255,0.2); }

      .cz-footer-col-title { font-weight: 600; font-size: 14px; margin-bottom: 16px; }
      .cz-footer-links { display: flex; flex-direction: column; gap: 12px; }
      .cz-footer-link { color: rgba(255,255,255,0.7); font-size: 14px; transition: color .15s ease; text-align: left; }
      .cz-footer-link:hover { color: #F79971; }
      .cz-footer-link--accent { color: #F79971; }
      .cz-footer-link--accent:hover { color: #ffb08a; }

      .cz-footer-newsletter-text { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 12px; }
      .cz-newsletter-row { display: flex; align-items: center; gap: 8px; }
      .cz-newsletter-input {
        flex: 1; min-width: 0; border-radius: 6px; background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.15); font-size: 14px; padding: 10px 12px; color: #ffffff;
      }
      .cz-newsletter-input::placeholder { color: rgba(255,255,255,0.4); }
      .cz-newsletter-input:focus { border-color: #B54700; }
      .cz-newsletter-btn {
        border-radius: 6px; background: #B54700; color: #ffffff; font-size: 14px; font-weight: 600;
        padding: 10px 16px; white-space: nowrap; transition: background-color .15s ease;
      }
      .cz-newsletter-btn:hover { background: #9c3d00; }

      .cz-footer-bottom {
        border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding-top: 24px;
        display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;
        font-size: 12px; color: rgba(255,255,255,0.5);
      }
      .cz-footer-bottom-links { display: flex; align-items: center; gap: 24px; }
      .cz-footer-bottom-links button:hover { color: rgba(255,255,255,0.8); }

      /* ---------- Features overview page ---------- */
      .cz-features-header { text-align: center; }
      .cz-features-header .cz-section-lead { margin-left: auto; margin-right: auto; }
      .cz-features-cta { text-align: center; margin-top: 48px; }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED UI                                                          */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Features", page: "features" },
  { label: "Pricing", page: "pricing" },
  { label: "Business Cards", page: "business" },
  { label: "Survey Cards", page: "survey" },
  { label: "Vehicle Cards", page: "vehicle" },
  { label: "Contact", page: "contact" },
];

function Header({ navigate, transparent }) {
  return (
    <header className={cx("cz-header", transparent ? "cz-header--transparent" : "cz-header--solid")}>
      <div className="cz-header-inner">
        <button
          onClick={() => navigate("home")}
          className={cx("cz-logo cz-display", transparent ? "cz-logo--transparent" : "cz-logo--solid")}
        >
          Cardz.Mobi
        </button>

        <nav className="cz-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={cx("cz-nav-link", transparent ? "cz-nav-link--transparent" : "cz-nav-link--solid")}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate("pricing")}
          className={cx("cz-btn-get-started", transparent ? "cz-btn-get-started--transparent" : "cz-btn-get-started--solid")}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}

function Footer({ navigate }) {
  const [email, setEmail] = useState("");
  return (
    <footer className="cz-footer">
      <div className="cz-footer-inner">
        <div className="cz-footer-grid">
          <div>
            <div className="cz-footer-brand cz-display">Cardz.Mobi</div>
            <p className="cz-footer-tagline">
              The modern way to share your identity. Create digital cards
              that work everywhere, update anytime, and impress every time.
            </p>
            <div className="cz-footer-social">
              <a href="#" aria-label="X" className="cz-social-btn"><FaXTwitter size={16} /></a>
              <a href="#" aria-label="LinkedIn" className="cz-social-btn"><FaLinkedin size={16} /></a>
              <a href="#" aria-label="Instagram" className="cz-social-btn"><FaInstagram size={16} /></a>
            </div>
          </div>

          <div>
            <div className="cz-footer-col-title">Product</div>
            <div className="cz-footer-links">
              <button onClick={() => navigate("features")} className="cz-footer-link">Features</button>
              <button onClick={() => navigate("pricing")} className="cz-footer-link cz-footer-link--accent">Pricing</button>
              <button onClick={() => navigate("business")} className="cz-footer-link">Business Cards</button>
              <button onClick={() => navigate("survey")} className="cz-footer-link">Survey Cards</button>
              <button onClick={() => navigate("vehicle")} className="cz-footer-link">Vehicle Cards</button>
            </div>
          </div>

          <div>
            <div className="cz-footer-col-title">Company</div>
            <div className="cz-footer-links">
              <button onClick={() => navigate("about")} className="cz-footer-link">About Us</button>
              <button onClick={() => navigate("contact")} className="cz-footer-link">Contact</button>
              <button onClick={() => navigate("blog")} className="cz-footer-link">Blog</button>
              <button onClick={() => navigate("careers")} className="cz-footer-link">Careers</button>
            </div>
          </div>

          <div>
            <div className="cz-footer-col-title">Support</div>
            <div className="cz-footer-links" style={{ marginBottom: 24 }}>
              <button className="cz-footer-link">Help Center</button>
              <button className="cz-footer-link">Privacy Policy</button>
              <button className="cz-footer-link">Terms of Service</button>
              <button className="cz-footer-link">FAQ</button>
            </div>
            <div className="cz-footer-col-title">Stay Updated</div>
            <p className="cz-footer-newsletter-text">Subscribe for product updates and tips.</p>
            <form onSubmit={(e) => e.preventDefault()} className="cz-newsletter-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="cz-newsletter-input"
              />
              <button type="submit" className="cz-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="cz-footer-bottom">
          <div>© 2026 Cardz.Mobi. All rights reserved.</div>
          <div className="cz-footer-bottom-links">
            <button>Privacy</button>
            <button>Terms</button>
            <button>Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FeatureCard({ icon, title, children }) {
  return (
    <div className="cz-card">
      <div className="cz-card-icon">{icon}</div>
      <h3 className="cz-card-title cz-display">{title}</h3>
      <p className="cz-card-text">{children}</p>
    </div>
  );
}

function CardTypeHero({ image, heading, highlight, paragraph, cta, onCta }) {
  return (
    <section className="cz-cthero">
      <img src={image} alt="" className="cz-cthero-img" />
      <div className="cz-cthero-overlay" />
      <div className="cz-cthero-content">
        <div className="cz-cthero-inner">
          <div className="cz-eyebrow">CARD TYPE</div>
          <h1 className="cz-cthero-h1 cz-display">
            {heading} <span className="cz-accent">{highlight}</span>
          </h1>
          <p className="cz-cthero-lead">{paragraph}</p>
          <button onClick={onCta} className="cz-btn-pill cz-btn-pill--orange">
            {cta} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection({ image, heading, highlight, paragraph, items, cta, onCta, reverse }) {
  return (
    <section className="cz-showcase">
      <div className={cx("cz-showcase-container", reverse && "cz-showcase--reverse")}>
        <div className="cz-showcase-img-wrap">
          <img src={image} alt="" className="cz-showcase-img" />
        </div>
        <div className="cz-showcase-content">
          <h2 className="cz-h2 cz-display">
            {heading} <span className="cz-accent">{highlight}</span>
          </h2>
          <p className="cz-showcase-lead">{paragraph}</p>
          <div className="cz-showcase-checklist">
            {items.map((item) => (
              <div key={item} className="cz-showcase-check-item">
                <Check size={14} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button onClick={onCta} className="cz-btn-pill cz-btn-pill--dark-solid">
            {cta} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGES                                                               */
/* ------------------------------------------------------------------ */

function HomePage({ navigate }) {
  return (
    <section className="cz-home-hero">
      <img src={homeBannerImg} alt="" className="cz-home-hero-img" />
      <div className="cz-home-hero-overlay" />
      <Header navigate={navigate} transparent />
      <div className="cz-home-hero-content">
        <div className="cz-home-hero-inner">
          <h1 className="cz-home-h1 cz-display">
            Your Identity,
            <br />
            <span className="cz-accent">Digital &amp; Dynamic</span>
          </h1>
          <p className="cz-home-lead">
            Create stunning digital business cards, survey cards, and
            vehicle cards. Share instantly via QR code, NFC tap, or link —
            and update anytime.
          </p>
          <div className="cz-home-cta-row">
            <button onClick={() => navigate("pricing")} className="cz-btn-pill cz-btn-pill--orange">
              Create Your Card <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate("features")} className="cz-btn-pill cz-btn-pill--dark-outline">
              Explore Features <Compass size={16} />
            </button>
          </div>
          <div className="cz-home-trust-row">
            <span className="cz-home-trust-item"><Shield size={14} /> Secure &amp; Private</span>
            <span className="cz-home-trust-item"><Globe size={14} /> Works Everywhere</span>
            <span className="cz-home-trust-item"><Clock size={14} /> Setup in 2 Minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessCardsPage({ navigate }) {
  return (
    <div>
      <Header navigate={navigate} />
      <CardTypeHero
        image={businessCardsBannerImg}
        heading="Digital"
        highlight="Business Cards"
        paragraph="Replace paper cards with smart, shareable digital business cards. Update anytime, track engagement, and make every first impression count."
        cta="Create Business Card"
        onCta={() => navigate("pricing")}
      />
      <section className="cz-section">
        <div className="cz-container">
          <h2 className="cz-h2 cz-display">
            Why Go Digital with <span className="cz-accent">Business Cards?</span>
          </h2>
          <p className="cz-section-lead">
            Paper cards get lost, outdated, and forgotten. Digital business
            cards are always current, easily shared, and packed with
            features paper cannot match.
          </p>
          <div className="cz-grid-3">
            <FeatureCard icon={<Smartphone size={20} />} title="Always Accessible">
              Your business card lives in the cloud. Anyone can access it
              24/7 from any device without downloading an app.
            </FeatureCard>
            <FeatureCard icon={<QrCode size={20} />} title="Instant QR Sharing">
              Generate a unique QR code for your card. Scan and save
              contacts in seconds at networking events, conferences, or
              meetings.
            </FeatureCard>
            <FeatureCard icon={<Nfc size={20} />} title="NFC Tap Technology">
              Tap your phone against any NFC-enabled device to share your
              card instantly. The future of networking is here.
            </FeatureCard>
            <FeatureCard icon={<ImageIcon size={20} />} title="Engagement Analytics">
              See who viewed your card, when they viewed it, and what they
              clicked. Make data-driven networking decisions.
            </FeatureCard>
            <FeatureCard icon={<Palette size={20} />} title="Brand Consistency">
              Upload your logo, set exact brand colors, and choose fonts
              that match your corporate identity perfectly.
            </FeatureCard>
            <FeatureCard icon={<Globe size={20} />} title="Multi-Language Support">
              Create cards in multiple languages. Perfect for international
              professionals and global businesses.
            </FeatureCard>
          </div>
        </div>
      </section>
      <ShowcaseSection
        image={businessLowerImg}
        heading="Rich, Interactive"
        highlight="Card Experience"
        paragraph="Your digital business card is more than contact info. Add your photo, bio, social links, portfolio gallery, services list, and even a booking calendar — all in one beautiful, mobile-optimized page."
        items={[
          "Click-to-call and click-to-email buttons",
          "Direct social profile links",
          "Portfolio and gallery showcase",
          "Embedded map and address",
          "Custom call-to-action buttons",
        ]}
        cta="Get Started"
        onCta={() => navigate("pricing")}
      />
    </div>
  );
}

function SurveyCardsPage({ navigate }) {
  return (
    <div>
      <Header navigate={navigate} />
      <CardTypeHero
        image={surveyBannerImg}
        heading="Digital"
        highlight="Survey Cards"
        paragraph="Collect feedback, ratings, and responses effortlessly. Share via QR code, embed in emails, or display at events."
        cta="Create Survey Card"
        onCta={() => navigate("pricing")}
      />
      <section className="cz-section">
        <div className="cz-container">
          <h2 className="cz-h2 cz-display">
            Feedback Collection <span className="cz-accent">Reimagined</span>
          </h2>
          <p className="cz-section-lead">
            Stop relying on paper forms and clunky survey tools. Digital
            survey cards make collecting feedback fast, beautiful, and
            frictionless for your audience.
          </p>
          <div className="cz-grid-3">
            <FeatureCard icon={<ClipboardList size={20} />} title="Instant Feedback Collection">
              Share a survey card after meetings, events, or purchases.
              Collect ratings, comments, and structured responses in
              real-time.
            </FeatureCard>
            <FeatureCard icon={<BarChart3 size={20} />} title="Real-Time Results Dashboard">
              Watch responses come in live. View aggregated charts, filter
              by date, and export data to CSV or Excel instantly.
            </FeatureCard>
            <FeatureCard icon={<QrCode size={20} />} title="QR Code Distribution">
              Place QR codes on receipts, tables, posters, or presentation
              slides. Customers scan and respond in seconds.
            </FeatureCard>
            <FeatureCard icon={<Settings size={20} />} title="Fully Customizable Forms">
              Build surveys with star ratings, multiple choice, text
              fields, and NPS scores. Match your brand look and feel.
            </FeatureCard>
            <FeatureCard icon={<Bell size={20} />} title="Instant Notifications">
              Get notified the moment someone submits feedback. Respond
              quickly to negative reviews and delight happy customers.
            </FeatureCard>
            <FeatureCard icon={<ShieldCheck size={20} />} title="Anonymous or Named Responses">
              Let respondents stay anonymous for honest feedback, or
              collect names and emails for follow-up campaigns.
            </FeatureCard>
          </div>
        </div>
      </section>
      <ShowcaseSection
        image={surveyLowerImg}
        heading="Perfect for"
        highlight="Any Scenario"
        paragraph="From post-purchase feedback to event satisfaction surveys, employee pulse checks to product research — digital survey cards adapt to every use case with elegant simplicity."
        items={[
          "Customer satisfaction surveys",
          "Event and conference feedback",
          "Employee engagement polls",
          "Product research questionnaires",
          "Restaurant and hospitality reviews",
        ]}
        cta="Start Collecting Feedback"
        onCta={() => navigate("pricing")}
        reverse
      />
    </div>
  );
}

function VehicleCardsPage({ navigate }) {
  return (
    <div>
      <Header navigate={navigate} />
      <CardTypeHero
        image={vehicleBannerImg}
        heading="Digital"
        highlight="Vehicle Cards"
        paragraph="Transform how buyers discover your inventory. Digital vehicle cards bring your showroom to every pocket."
        cta="Create Vehicle Card"
        onCta={() => navigate("pricing")}
      />
      <section className="cz-section">
        <div className="cz-container">
          <h2 className="cz-h2 cz-display">
            Modern Showroom <span className="cz-accent">Experience</span>
          </h2>
          <p className="cz-section-lead">
            Replace printed brochures with interactive digital cards. Buyers
            get complete vehicle information, stunning photos, and instant
            contact options — all from a simple scan.
          </p>
          <div className="cz-grid-3">
            <FeatureCard icon={<Car size={20} />} title="Full Vehicle Showcase">
              Display high-resolution photos, detailed specs, pricing, and
              features in a stunning mobile-optimized layout.
            </FeatureCard>
            <FeatureCard icon={<QrCode size={20} />} title="Showroom QR Codes">
              Place QR codes on vehicle windshields and showroom displays.
              Buyers scan and get the full digital brochure instantly.
            </FeatureCard>
            <FeatureCard icon={<Phone size={20} />} title="One-Tap Contact">
              Potential buyers tap to call, message, or email directly from
              the card. Remove every barrier between interest and action.
            </FeatureCard>
            <FeatureCard icon={<MapPin size={20} />} title="Integrated Location">
              Embed your dealership location with turn-by-turn navigation.
              Buyers find you without searching.
            </FeatureCard>
            <FeatureCard icon={<ImageIcon size={20} />} title="Photo Gallery">
              Upload unlimited photos of interior, exterior, and engine
              bay. Let buyers explore every detail before visiting.
            </FeatureCard>
            <FeatureCard icon={<Tag size={20} />} title="Dynamic Pricing">
              Update prices, offers, and financing options in real-time.
              Every card always shows current inventory and deals.
            </FeatureCard>
          </div>
        </div>
      </section>
      <ShowcaseSection
        image={vehicleLowerImg}
        heading="Built for"
        highlight="Auto Professionals"
        paragraph="Whether you run a single dealership or a multi-location auto group, digital vehicle cards scale with your business. Manage hundreds of listings, track buyer engagement, and close more sales."
        items={[
          "Dealership inventory management",
          "Private seller listings",
          "Rental fleet showcases",
          "Auto repair service cards",
          "Car wash and detail promotions",
        ]}
        cta="Get Started"
        onCta={() => navigate("pricing")}
      />
    </div>
  );
}

function PricingCard({ plan, price, period, description, features, cta, featured, dark, onCta }) {
  return (
    <div className={cx("cz-pcard", featured ? "cz-pcard--featured" : dark ? "cz-pcard--dark" : "cz-pcard--plain")}>
      {featured && <span className="cz-pcard-badge">Most Popular</span>}
      <h3 className="cz-pcard-plan cz-display">{plan}</h3>
      <p className="cz-pcard-desc">{description}</p>
      <div className="cz-pcard-price cz-display">
        <span className="amount">${price}</span>
        <span className="period">{period}</span>
      </div>
      <div className="cz-pcard-features">
        {features.map((f) => (
          <div key={f} className="cz-pcard-feature">
            <Check size={15} />
            <span>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={onCta} className="cz-pcard-cta">{cta}</button>
    </div>
  );
}

function PricingPage({ navigate }) {
  return (
    <div>
      <Header navigate={navigate} />
      <section className="cz-pricing-section">
        <div className="cz-container cz-pricing-header">
          <h1 className="cz-pricing-h1 cz-display">
            Simple, Transparent
            <br />
            <span className="cz-accent">Pricing</span>
          </h1>
          <p className="cz-pricing-lead">
            Start free, upgrade when you need more. No hidden fees, no
            surprises.
          </p>

          <div className="cz-pricing-grid">
            <PricingCard
              plan="Starter"
              description="Perfect for individuals getting started with digital cards."
              price="0"
              period="forever"
              features={["1 digital card", "QR code sharing", "Basic templates", "Standard analytics", "Email support"]}
              cta="Get Started Free"
              onCta={() => navigate("contact")}
            />
            <PricingCard
              plan="Pro"
              description="For professionals who need more power and branding."
              price="9"
              period="/month"
              featured
              features={["5 digital cards", "QR + NFC sharing", "Custom branding", "Advanced analytics", "Priority support", "Remove branding"]}
              cta="Start Pro Trial"
              onCta={() => navigate("contact")}
            />
            <PricingCard
              plan="Business"
              description="For teams and businesses managing multiple card users."
              price="29"
              period="/month"
              dark
              features={["Unlimited cards", "QR + NFC + Link", "Full white-label", "Team management", "API access", "Dedicated support", "Custom domains"]}
              cta="Contact Sales"
              onCta={() => navigate("contact")}
            />
          </div>

          <p className="cz-pricing-footnote">
            Need a custom enterprise plan?{" "}
            <button onClick={() => navigate("contact")}>Contact our sales team</button>
          </p>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <div className="cz-info-card">
      <div className="cz-info-icon">{icon}</div>
      <h3 className="cz-info-title cz-display">{title}</h3>
      <p className="cz-info-text">{children}</p>
    </div>
  );
}

function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <div>
      <Header navigate={navigate} />
      <section className="cz-contact-section">
        <div className="cz-container cz-contact-header">
          <h1 className="cz-contact-h1 cz-display">
            Get in <span className="cz-accent">Touch</span>
          </h1>
          <p className="cz-contact-lead">
            Have questions about Cardz.Mobi? Want a custom enterprise plan?
            We are here to help.
          </p>

          <div className="cz-contact-grid">
            <div className="cz-info-col">
              <InfoCard icon={<Mail size={18} />} title="Email Us">
                <a href="mailto:hello@cardz.mobi">hello@cardz.mobi</a>
              </InfoCard>
              <InfoCard icon={<Clock size={18} />} title="Response Time">
                We typically respond within 24 hours on business days.
              </InfoCard>
              <InfoCard icon={<Bell size={18} />} title="Priority Support">
                Pro and Business plans include priority email support with
                faster response times.
              </InfoCard>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="cz-form">
              <div className="cz-form-row">
                <div>
                  <label className="cz-form-label">Name *</label>
                  <input
                    className="cz-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="cz-form-label">Email *</label>
                  <input
                    className="cz-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="cz-form-group">
                <label className="cz-form-label">Subject</label>
                <input
                  className="cz-input"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className="cz-form-group">
                <label className="cz-form-label">Message *</label>
                <textarea
                  className="cz-textarea"
                  maxLength={500}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <div className="cz-char-count">{form.message.length}/500</div>
              </div>

              <button type="submit" className="cz-btn-pill cz-btn-pill--orange cz-form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const FEATURES_OVERVIEW = [
  {
    title: "Instant QR Sharing",
    icon: <QrCode size={20} />,
    text: "Generate a unique QR code for every card. Anyone can scan and save your contact in seconds — no app required.",
  },
  {
    title: "NFC Tap Technology",
    icon: <Nfc size={20} />,
    text: "Tap your phone against any NFC-enabled device to share your card instantly. Works on iPhone and Android.",
  },
  {
    title: "Real-Time Analytics",
    icon: <BarChart3 size={20} />,
    text: "Track who viewed your card, when, and from where. Get insights to optimize your networking strategy.",
  },
  {
    title: "Unlimited Updates",
    icon: <RefreshCw size={20} />,
    text: "Change your details anytime without reprinting. Your card link always shows the latest version.",
  },
  {
    title: "Custom Branding",
    icon: <Palette size={20} />,
    text: "Add your logo, brand colors, and fonts. Every card feels uniquely yours and professionally polished.",
  },
  {
    title: "Multi-Card Management",
    icon: <Layers size={20} />,
    text: "Create different cards for work, personal, events, or vehicles. Switch between profiles effortlessly.",
  },
];

function FeaturesPage({ navigate }) {
  return (
    <div>
      <Header navigate={navigate} />
      <section className="cz-section">
        <div className="cz-container">
          <div className="cz-features-header">
            <h1 className="cz-h2 cz-display">
              Powerful <span className="cz-accent">Features</span>
            </h1>
            <p className="cz-section-lead">
              Everything you need to create, share, and track your digital
              cards — all in one platform.
            </p>
          </div>
          <div className="cz-grid-3">
            {FEATURES_OVERVIEW.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title}>
                {f.text}
              </FeatureCard>
            ))}
          </div>
          <div className="cz-features-cta">
            <button onClick={() => navigate("pricing")} className="cz-btn-pill cz-btn-pill--orange">
              Start Creating Cards <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SimplePage({ title, navigate }) {
  return (
    <div>
      <Header navigate={navigate} />
      <section className="cz-section" style={{ textAlign: "center", padding: "112px 0" }}>
        <h1 className="cz-h2 cz-display" style={{ marginBottom: 12 }}>{title}</h1>
        <p className="cz-section-lead" style={{ margin: "0 auto" }}>Content coming soon.</p>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP / ROUTER                                                       */
/* ------------------------------------------------------------------ */

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  let content;
  switch (page) {
    case "home": content = <HomePage navigate={navigate} />; break;
    case "business": content = <BusinessCardsPage navigate={navigate} />; break;
    case "survey": content = <SurveyCardsPage navigate={navigate} />; break;
    case "vehicle": content = <VehicleCardsPage navigate={navigate} />; break;
    case "pricing": content = <PricingPage navigate={navigate} />; break;
    case "contact": content = <ContactPage navigate={navigate} />; break;
    case "features": content = <FeaturesPage navigate={navigate} />; break;
    default: content = <SimplePage title={page} navigate={navigate} />;
  }

  return (
    <div className="cz-root">
      <GlobalStyles />
      <div className="cz-page-main">{content}</div>
      <Footer navigate={navigate} />
    </div>
  );
}
