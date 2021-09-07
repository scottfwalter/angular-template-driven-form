export interface Power {
  name: string;
  /** Range of power strengths, from lame to amazing */ 
  qualifiers?: string[];
}

/** Hero Power Choices and their subordinate Power Qualifiers 
 * Each power has its own qualifiers. */
export const powers: Power[] = [
  {
    name: 'None',
    qualifiers: []
  },
  {
    name: 'Really Smart', 
    qualifiers: [
      'Above Average',
      'Genius',
      'Ominiscient'
      ]
  },
  {
    name: 'Super Flexible',
    qualifiers: [
      'Double Jointed',
      'Rubber Bandy'
    ]
  },
  {
    name: 'Super Hot', 
    qualifiers: [
    '600 Degrees',
    '2000 Degrees',
    '50 Million Degrees',
    'Thermonuclear',
    ]
  },
  {
    name: 'Weather Changer',
    qualifiers: [
      'Local',
      'Regional',
      'Global',
    ]
  },
  {
    name: 'Other',
    qualifiers: [ ]
  },
];