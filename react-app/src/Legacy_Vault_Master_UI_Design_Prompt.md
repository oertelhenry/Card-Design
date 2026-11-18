# Legacy Vault — Master AI UI Design Prompt

Design a complete, production-quality web application UI for a premium digital estate-planning and legacy-management platform called **Legacy Vault**.

## 1. Product concept

Legacy Vault solves a simple but important problem:

> When someone dies or becomes unable to manage their affairs, the people left behind often have no idea what the person owned, which policies they had, where important documents are stored, which accounts exist, who to contact, or what they wanted to happen.

Legacy Vault allows a person to securely record the important details of their life and control how that information is eventually handed over to trusted people.

This is **not primarily a password manager** and should not look like a generic document-storage application.

The product should feel like a combination of:

- Premium estate planning
- Private wealth management
- Digital legacy planning
- Secure document management
- Personal emergency preparedness
- Controlled information handover

The emotional promise is:

> **Everything your family needs to know, when they need to know it.**

Alternative supporting messaging:

> **Make sure the people you leave behind know what exists, where it is, and what to do.**

> **Peace of mind for you and the people you care about.**

---

# 2. Visual direction

Create a **premium estate-planning aesthetic**.

Think:

- Private banking
- Family office
- High-end wealth management
- Premium legal/estate planning
- Luxury financial services

Avoid:

- Generic SaaS dashboards
- Bright startup colours
- Cryptocurrency aesthetics
- Excessive gradients
- Cartoon illustrations
- Emoji-heavy interfaces
- "AI-generated" looking iconography
- Excessive rounded cards
- Loud marketing graphics
- Dark cyber-security aesthetics

### Colour palette

Primary:

- Deep navy / midnight blue
- Dark blue-green / forest teal
- Warm ivory / off-white
- White
- Muted sage green
- Subtle warm grey

Accent:

- Restrained gold/champagne may be used sparingly for premium details.

Use colour primarily to establish hierarchy and trust, not decoration.

### Typography

Use a sophisticated serif font for major headings and an extremely clean sans-serif for UI elements.

The combination should feel similar to a premium financial institution or private wealth-management service.

Large headings should feel elegant rather than technological.

---

# 3. Brand

Brand name:

**LEGACY VAULT**

Logo concept:

A refined minimal symbol combining:

- a leaf
- a subtle shield
- or an abstract representation of legacy/continuity

The logo should be understated and elegant.

Possible tagline:

**The important things. In one place.**

Supporting statement:

**Make sure the people you leave behind know what exists, where it is, and what to do.**

---

# 4. Primary navigation

Create a desktop application with a refined left navigation.

Navigation:

- Home
- My Inventory
- Trusted People
- Activation Settings
- Documents
- Messages
- Settings

User profile at the bottom.

The navigation should feel more like a private banking application than a typical SaaS admin system.

---

# 5. Dashboard / Home

The dashboard should immediately communicate the user's overall preparedness.

Hero:

**Good morning, John**

Supporting message:

> Your legacy is more than just what you leave behind. It's what you make possible.

Show a prominent:

### Legacy Readiness

Example:

**63%**

**You've completed 10 of 16 items**

Button:

**Continue setup →**

Also display:

### Next check-in

> Your next check-in is in 21 days.

> We'll send you a friendly reminder to confirm you're OK.

---

# 6. Legacy Inventory

Create a central "My Legacy Inventory" section.

Categories should include:

### Financial

Examples:

- Bank accounts
- Investments
- Retirement annuities
- Savings
- Credit cards
- Loans
- Other financial interests

### Insurance

Examples:

- Life insurance
- Funeral policies
- Short-term insurance
- Medical aid
- Disability cover

### Property

Examples:

- Primary residence
- Investment properties
- Holiday homes
- Land
- Rental properties

### Vehicles

Examples:

- Cars
- Motorcycles
- Boats
- Finance agreements

### Documents

Examples:

- Will
- Trust documents
- Deeds
- Contracts
- Marriage certificate
- Birth certificates
- Important legal documents

### Digital

Examples:

- Email
- Social media
- Cloud storage
- Password manager
- Websites/domains
- Cryptocurrency
- Digital businesses

### Personal

Examples:

- Personal wishes
- Important contacts
- Pets
- Family information
- Personal messages
- Things the family should know

### Funeral

Examples:

- Funeral policy
- Funeral wishes
- Preferred funeral home
- Burial/cremation wishes
- Religious/cultural preferences
- Important people to contact

Each category should display:

- Number of items
- Completion status
- Missing information
- Whether the information has been assigned to someone

---

# 7. Individual asset/detail screen

Design a detailed information screen for an individual item.

Example:

## Discovery Bank

Category: Financial

Status:

**Linked**

Fields:

- Account type
- Account number
- Institution
- Contact information
- What to do
- Beneficiary
- Notes

Important concept:

The platform should NOT encourage users to store banking passwords directly.

Instead allow something like:

**Login details**

> Stored securely in 1Password

or:

> Password manager: 1Password

This makes Legacy Vault primarily a **discovery and handover system**, rather than a password manager.

Allow:

- Documents
- Notes
- Contacts
- Instructions
- Beneficiary assignment
- Visibility/release settings

---

# 8. Trusted People

Create a dedicated section called:

## Trusted People

Users can add:

- Spouse
- Partner
- Child
- Parent
- Sibling
- Executor
- Attorney
- Financial adviser
- Business partner
- Other trusted person

Each trusted person should have:

- Name
- Relationship
- Email
- Phone
- Role
- What they can access
- What information can be released to them
- Whether they can initiate an access request

Important:

Different people should be able to receive different information.

Example:

### Wife

Can receive:

- Financial
- Insurance
- Property
- Vehicles
- Funeral
- Personal

### Executor

Can receive:

- Financial
- Property
- Legal documents
- Debts
- Estate information

### Child

Can receive:

- Personal message
- Family information
- Selected documents

---

# 9. Controlled release

This is one of the most important parts of the application.

Do NOT simply have:

> "If I die, send everything."

Instead create a sophisticated **controlled release system**.

Each item can have its own release rules.

For example:

### Emergency information

May be released quickly:

- Funeral policy
- Medical aid
- Emergency contacts
- Location of will
- Executor details
- Funeral wishes

### Estate information

Released after verification:

- Bank accounts
- Investments
- Insurance
- Property
- Vehicles
- Debts

### Digital information

Released separately:

- Email
- Social media
- Digital assets
- Cryptocurrency
- Password-manager instructions

### Personal information

Potentially released separately:

- Letters
- Personal messages
- Photographs
- Private wishes

The UI should make these levels very easy to understand.

---

# 10. Activation Settings

Create a major section called:

## How should your Legacy Vault activate?

Explain:

> You remain in control. Choose how your Legacy Vault should respond if we can no longer reach you.

Provide multiple activation methods.

### Method 1 — Inactivity

Example:

**Check in every 30 days**

The user receives:

> Are you OK?

with a simple button:

**I'm OK**

If the user doesn't respond, progressively escalate.

---

### Method 2 — Trusted person

A trusted person can initiate an access request.

Example:

> Your spouse can request access to your Legacy Vault at any time.

This does NOT immediately release the information.

---

### Method 3 — Executor

The executor can initiate the process.

---

### Method 4 — Multiple people

Allow rules such as:

> My spouse AND my executor must request access before release begins.

---

### Method 5 — Custom rules

Allow sophisticated conditions.

For example:

> If I haven't confirmed my status for 30 days AND my spouse requests access, begin the verification process.

---

# 11. "Are You OK?" flow

Design the complete notification journey.

### Day 30

Email/SMS/push notification:

> **Are you OK?**

> Hi John, we just want to make sure you're still active.

Button:

**I'm OK**

Secondary:

**Open Legacy Vault**

---

### Day 37

Follow-up reminder.

---

### Day 44

Trusted contact is notified:

> We haven't been able to confirm John's status.

Important:

At this stage, information is NOT released.

---

### Day 51+

Begin the controlled release process according to the user's configured rules.

Make the timeline visually obvious.

Use a timeline such as:

1. Initial reminder
2. Follow-up
3. Trusted contact notified
4. Verification
5. Release process

Make it clear that:

**No response does not automatically mean someone has died.**

The system should use multiple verification stages.

---

# 12. Trusted-person access request

Create the UI that a spouse, executor or trusted person sees.

Example:

> **John has been notified that you requested access to his Legacy File.**

> We've sent him a notification and given him an opportunity to confirm that everything is OK.

Show:

**I'm OK**

and:

**I need help**

If John does not respond within the configured period, continue the verification process.

Example:

> If we don't hear from John within 48 hours, we'll send another notification.

This is a major security and trust feature.

---

# 13. Beneficiary / recipient access

Once release is authorised, the trusted person should NOT simply receive the user's entire account.

Instead show:

## John's Legacy File

**Information released to you**

Sections:

- Financial
- Insurance
- Property
- Vehicles
- Documents
- Digital
- Personal
- Funeral

Clearly show:

**Why this information was released**

Example:

> Released according to John's Legacy Vault instructions.

Show audit information:

- Date released
- Who authorised it
- What was released

---

# 14. Legacy Pack

Create a feature that generates a clean overview called:

## Legacy Pack

This should provide a printable/downloadable summary.

Example:

### John's Legacy Information

**Executor**

Jane Smith

**Attorney**

ABC Attorneys

**Financial adviser**

XYZ Wealth

**Will location**

ABC Attorneys

### Financial

Discovery Bank  
Old Mutual  
Sanlam

### Insurance

Life policy  
Funeral policy

### Property

Primary residence  
Investment property

### Digital

Email  
Password manager  
Social media

### Important contacts

...

The Legacy Pack should NOT necessarily contain sensitive passwords.

It should tell the family:

**What exists, where it is, who to contact and what to do.**

---

# 15. Legacy Readiness

Make this a central product concept.

Display a readiness score/progress indicator.

Example:

**63% Legacy Ready**

Then show outstanding tasks:

- Add life insurance policy
- Add executor
- Upload will
- Add funeral wishes
- Assign spouse to financial information
- Record location of original documents

This gives users a reason to return to the application.

---

# 16. Onboarding

Design a beautiful onboarding flow.

Start with:

> **Let's make sure your important information is never lost.**

Then progressively ask:

### Do you own property?

Yes / No

### Do you have life insurance?

Yes / No

### Do you have a funeral policy?

Yes / No

### Do you have investments?

Yes / No

### Do you have retirement savings?

Yes / No

### Do you own vehicles?

Yes / No

### Do you have a will?

Yes / No

### Do you have digital assets?

Yes / No

### Do you own or operate a business?

Yes / No

### Do you have a password manager?

Yes / No

The system should then build the user's personalised Legacy Inventory.

---

# 17. Emergency Mode

Do not make Legacy Vault useful only after death.

Include an **Emergency Access** concept.

For example, if the user is:

- Hospitalised
- Travelling
- Unreachable
- Incapacitated
- Dealing with an emergency

they can manually activate a temporary emergency release.

Allow them to choose:

> Release emergency information to my spouse.

This might include:

- Medical aid
- Insurance
- Emergency contacts
- Financial contacts
- Important documents

This helps make the product useful while the user is alive.

---

# 18. Messages / Personal Legacy

Create a section where users can prepare personal messages.

Examples:

- Message to spouse
- Message to children
- Family message
- Business message
- Personal instructions

These should have independent release settings.

For example:

> Release to Sarah only after Legacy Vault is activated.

The design should feel emotional and respectful, but not overly sentimental.

---

# 19. Security

Security should be visible but understated.

Use language such as:

- Secure
- Private
- Encrypted
- Controlled access
- You remain in control
- Full access history
- POPIA-conscious

Do not make the UI look like a cyber-security product.

Include an:

## Access History

Example:

> 30 Sep — You updated your Discovery Bank information.

> 12 Sep — Sarah was added as a trusted person.

> 01 Sep — Your Legacy Vault check-in was confirmed.

> No beneficiary information has been released.

---

# 20. Mobile application

Design responsive mobile screens as well.

The mobile experience should focus on:

- Legacy readiness
- Inventory
- Trusted people
- Check-in
- Activation status

Include a polished mobile mockup in the visual design.

---

# 21. Marketing website

In addition to the authenticated application, design a premium public-facing landing page.

Hero:

# The important things.
# In one place.

Subheading:

> Make sure the people you leave behind know what exists, where it is, and what to do.

Primary CTA:

**Create your Legacy Vault**

Secondary CTA:

**See how it works**

Hero imagery should use elegant, atmospheric photography — for example a sophisticated home, landscape, family environment, or calm natural scene.

Avoid images of:

- Funerals
- Graveyards
- Death
- Sad families
- Hospitals

The product should sell **peace of mind**, not fear.

---

# 22. Marketing sections

Include:

### Everything your family needs to know

Financial  
Insurance  
Property  
Vehicles  
Documents  
Digital  
Personal  
Funeral

### You remain in control

Explain the configurable activation system.

### What happens if we can't reach you?

Show the visual timeline:

**Check in → Reminder → Trusted contact → Verification → Controlled release**

### Built for real life

Explain that it can help with:

- Death
- Incapacity
- Emergencies
- Family transitions
- Estate administration

### More than a vault

Use messaging around:

> Knowing what exists is just as important as knowing where the documents are.

---

# 23. Important product philosophy

The interface must communicate these principles:

### No false assumption of death

Not responding to a check-in does not automatically mean someone has died.

### Multiple safeguards

The release process should involve multiple verification stages.

### Granular access

Different trusted people can receive different information.

### User control

The owner controls what gets released, to whom and under what circumstances.

### Discovery rather than password storage

The platform primarily helps families discover assets, policies, documents, contacts and instructions.

### Peace of mind

The emotional outcome is:

> "My family will know what to do."

---

# 24. Important screens to produce

Create a cohesive UI system and mockups for at least these screens:

1. Public landing page
2. Login
3. Sign-up
4. Onboarding
5. Home dashboard
6. Legacy Readiness
7. My Legacy Inventory
8. Category view
9. Individual asset detail
10. Add asset
11. Trusted People
12. Trusted Person detail
13. Activation Settings
14. Inactivity settings
15. "Are You OK?" notification
16. Activation timeline
17. Access request
18. Beneficiary access
19. Released Legacy File
20. Legacy Pack
21. Documents
22. Personal Messages
23. Emergency Mode
24. Access History
25. Settings
26. Mobile dashboard
27. Mobile inventory
28. Mobile check-in
29. Mobile activation status

---

# 25. Overall design requirement

The entire application must look like something a wealthy family would trust with their most important personal information.

The visual language should communicate:

**Trust**

**Permanence**

**Privacy**

**Discretion**

**Security**

**Calm**

**Elegance**

**Humanity**

It should feel more like a **private wealth-management / estate-planning service** than a technology product.

Use generous whitespace, sophisticated typography, restrained colour, elegant photography and very clean information hierarchy.

Every screen should feel like it belongs to the same premium product.

Do not overuse cards, pills, gradients or decorative icons.

Use subtle borders, understated shadows and excellent spacing.

The UI should look realistic enough that it could be handed directly to a development team as the foundation for a production application.

The final result should make a user immediately understand:

> **"If something happens to me, the people I trust will know what exists, where it is, and what they need to do — without me having to tell them."**
