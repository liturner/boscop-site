# Terminology

## Behörden und Organisationen mit Sicherheitsaufgaben (BOS)

> Staatliche (polizeiliche und nichtpolizeiliche) sowie nichtstaatliche Akteure, die spezifische Aufgaben zur Bewahrung und/oder Wiedererlangung der öffentlichen Sicherheit und Ordnung wahrnehmen. Konkret sind dies z.B. die Polizei, die Feuerwehr, das THW, die Katastrophenschutzbehörden der Länder oder die privaten Hilfsorganisationen, sofern sie im Bevölkerungsschutz mitwirken.

- [Bundesamt für Bevölkerungsschutz und Katastrophenhilfe](https://www.bbk.bund.de/SharedDocs/Glossareintraege/DE/B/BOS.html)

## Common Operational Picture (COP)

> An operational picture tailored to the user's requirements, based on common data and information shared by more than one command. 2016-09-05

- NATO AAP-15 - NATO GLOSSARY OF ABBREVIATIONS USED IN NATO DOCUMENTS AND PUBLICATIONS
- NATO AAP-06 - NATO GLOSSARY OF TERMS AND DEFINITIONS 

See: [Developing a common operational picture for sustainment](https://www.army.mil/article/194399/developing_a_common_operational_picture_for_sustainment)

# Current Situation

Existing tools at emergency response centers (dispatch) are very effective at producing an overall COP for their level of communication. There is however a drastic loss of fine detailed informaiton at the operational level. Zugfuhrer from the THW and Fw are not trained in how to interact with the extreme complexity of managing a COP "in the field". In many cases, even relatively large disasters are managed with whiteboards and magnets. Existing organisations are organised in a heierachy, and information exchange takes place at all levels. Due to the predominantly manual nature of the information exchange, this consumes large quantities of time.

Furthermore, due to the cadence of information exchange and decision making in large disasters, it is entirely possible that entire groups of rescue teams sit inactive waiting for the next task to be assigned at the next leader meeting.

- THW DV-100
- Fw DV-100

# Desired Situation

The operational levels of these services (predominantly the THW and Fw) should have access to significantly more fine detailed and up to date information regarding the current situation. As an example, opportunistic decisions may be made if it is visible on a map that a THW Bergungsgruppe currently has no task assigned. Furthermore, the effectiveness of "Toast" notifications is well known in modern information distribution.

As a manager in a disaster, I should be able to see the current location, activity and status of my command in real time. Furthermore, as a helper, I should be able to see the situation in real time.

The concept revolves around open information. As with the Water level alerts (TODO: Add Ref), NINA (Add Ref) and several other tools, it is lifesaving to distribute information. Due to the sensitive nature of GPS locations of individuals, the audience must however be limited to relevant personel. However, within this limited audience (which must include down to the Helper level of the THW), all information is considered open.

- Example Expected Image - https://in.pinterest.com/pin/509469776605153078/
- THW DV-102 - Taktische Zeichen

# Required Changes

- Current positions of vehicles, groups and individuals must be visible on a map, and updated in realtime
- Erkundung must be able to add notes to a map in real time, which can be seen in real time

# Assumptions

- The data contained within the program is to be considered, and marked, VS-NfD. Only allowed users will have access to the image.
- Access to the applications and "the COP" must be managed. Continued rights to access the image must be regularly controlled.

The BOS COP project aims to create a web service which will host a COP of the current BOS situation in Germany. It aims to be an accessible service which can be accessed by numerous organisations to assist in the dissemination of information regarding the current status of resources, risks and activities.

The BOS COP service takes as input:
- GPS positions from various transmitters
- A Base Map using German maps

As Output
- A User Front End
- An API exposing the COP as a WFS service

Target Users
- Non-technical
- Potentially volunteer and part time (as with the THW and Fw)

Limits to Scope
The product will not exceed the size or complexity of a service, which could not be tought to a user in a single day. This logic ensures that users in organisations such as the THW can be trained using relatively low cost method.

# Technical Details

The BOS COP project aims delegates (where possible) technology and interface choices to NATO Standardisation.

- [ADatP-34 - NATO Interoperability Standards and Profiles](https://nhqc3s.hq.nato.int/Apps/Architecture/NISP/index.html)
- [TIDE](https://tide.act.nato.int/)

# This Site

This site is the public facing "Product Site" for the tool. It has a number of aims:
1. It must sell the product. It is an advertising platform.
2. It must enable access to support.
3. It must look like a governmental site.

Visitors to the site must be recieved by a landing page, which is instantly recognisable as a high quality, and trustworthy site. They must be able to understand what the advertised tool can do, including what "BOS" means, and what "COP" means, and why the BOS need a COP.

Furthermore, visitors to the site must be able to initiate contact for topics such as support and sales.

# Acronym

AAP - Allied Administrative Publication
BBK - Bundesamt für Bevölkerungsschutz und Katastrophenhilfe
BOS - Behörden und Organisationen mit Sicherheitsaufgaben
THW - Technisches Hilfswerk
VS-NfD - Verschlusssachen – nur für den Dienstgebrauch

