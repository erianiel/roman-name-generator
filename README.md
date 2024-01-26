# 🏛 roman-name-generator

A realistic ancient Roman name generator.

Names are generated according to the ancient Roman conventions on social status and gender.

It is totally based on studies of Roman epigraphy and historic sources, but it does not have a specific century of reference to keep it more flexible.

## Explanation

In ancient Roman society, a person's name had big relevance. It summed up the essence of the citizens themselves, their ancestors and their personal values.
Thus, it was essential for social life, for the _vita activa_ (active life).

Ancient Roman names were distinguished according to gender and legal status, i.e. whether the person was born free or was a freedwoman/freedman or a slave.

- The name of a male citizen consisted of three parts: _praenomen_, _nomen_, _cognomen_.

- The name of a female citizen was formed by only two parts: _nomen_ and _cognomen_.

- Slaves had only a simple name.

- When slaves were freed, they used to take the _praenomen_ and _nomen_ of their ex master and their slave name became the _cognomen_.

### Praenomen

Originally it was the personal name of the Roman citizen, but from the 3rd century BC., Roman people began to use few prenomina and in abbreviated form.

For some centuries women had also a prenomen, but it was only used within the family or in unofficial contexts. It was because women did not participate to the _vita activa_, in the senate, thus there was no need to distinguish them.

For this reason and not to forget how women were considered in ancient societies, women generated names have no praenomen.

### Nomen

It indicates the family to which the individual belongs and designates all the members of the same _gens_: men and women, free born or freed.

### Cognomen

It was an unofficial nickname given to distinguish people more precisely. It could be created on the basis of physical or psychological characteristics. It could derive from the names of cities or folks, trades, or even plants.

## How to use

### Generate random fullname

| attribute | values (required)                     |
| --------- | ------------------------------------- |
| gender    | `male`, `female`, `any`               |
| status    | `citizen`, `libertus`, `slave`, `any` |

```JS

import { generateFullName, ANY, GENDER, STATUS } from "roman-name-generator";

generateFullName(GENDER.FEMALE, STATUS.CITIZEN); // Popillia Rufa
generateFullName(GENDER.MALE, STATUS.LIBERTUS); // Paullus Teius Orpheus
generateFullName(ANY, STATUS.SLAVE); // Bissula
generateFullName(GENDER.MALE, ANY); // Proculus Scantius Purpureo

```

### Generate random person

```JS

import { generatePerson } from "roman-name-generator";

generatePerson(); // { fullName: Popillia Rufa, gender: "female", status: "citizen" }

```
