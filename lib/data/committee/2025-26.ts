import type { YearCommittee } from '@/types/committee';

import mrunaliMam from '@/src/assets/committee/2025-26/faculty/mrunali-pawar.webp';
import adityaImg from '@/src/assets/committee/2025-26/core/aditya-ahirrao.png';
import ayushiImg from '@/src/assets/committee/2025-26/core/ayushi-deore.svg';
import vedantImg from '@/src/assets/committee/2025-26/core/vedant-sonawane.svg';
import ishaniImg from '@/src/assets/committee/2025-26/core/ishani-mukewar.svg';
import jeetImg from '@/src/assets/committee/2025-26/core/jeet-patil.svg';
import monishImg from '@/src/assets/committee/2025-26/core/monish-patil.svg';
import sanskrutiImg from '@/src/assets/committee/2025-26/core/sanskruti-gite.svg';
import pranitaImg from '@/src/assets/committee/2025-26/core/pranita-patil.svg';

import shrimantImg from '@/src/assets/committee/2025-26/technical/shrimant-marathe.svg';
import omcImg from '@/src/assets/committee/2025-26/technical/om-chaudhari.jpeg';
import piyushImg from '@/src/assets/committee/2025-26/technical/piyush-shendge.svg';
import rajanImg from '@/src/assets/committee/2025-26/technical/rajan-udapure.svg';

import dishaImg from '@/src/assets/committee/2025-26/editorial/disha-kapse.svg';
import madhuraImg from '@/src/assets/committee/2025-26/editorial/madhura-katti.svg';
import zaweriyaImg from '@/src/assets/committee/2025-26/editorial/zaweriya-khan.svg';

import atharvaImg from '@/src/assets/committee/2025-26/events/atharva-kulkarni.svg';
import omImg from '@/src/assets/committee/2025-26/events/om-patil.svg';
import kshitijaImg from '@/src/assets/committee/2025-26/events/kshitija-daware.svg';
import nehaImg from '@/src/assets/committee/2025-26/events/neha-bhamare.svg';
import parthImg from '@/src/assets/committee/2025-26/events/parth-waje.svg';
import sahilImg from '@/src/assets/committee/2025-26/events/sahil-batheja.svg';

import riyaImg from '@/src/assets/committee/2025-26/creative/riya-sequeira.svg';
import swaradaImg from '@/src/assets/committee/2025-26/creative/swarada-joshi.svg';
import shravaniImg from '@/src/assets/committee/2025-26/creative/shravani-bhagwat.svg';
import prashantImg from '@/src/assets/committee/2025-26/creative/prashant-deokar.svg';
import siddharthImg from '@/src/assets/committee/2025-26/creative/siddharth-wade.svg';

export const committee2025_26: YearCommittee = {
  year: '2025-26',
  label: '2025–26',
  status: 'revealed',
  teams: [
    {
      id: 'faculty',
      title: 'Faculty Incharge',
      members: [
        { id: 'mrunali-pawar', name: 'Prof. Mrunali Pawar', role: 'Faculty Incharge', image: mrunaliMam },
      ],
    },
    {
      id: 'core',
      title: 'Core Committee',
      members: [
        { id: 'aditya-ahirrao', name: 'Aditya Ahirrao', role: 'President', image: adityaImg },
        { id: 'ayushi-deore', name: 'Ayushi Deore', role: 'Vice President', image: ayushiImg },
        { id: 'vedant-sonawane', name: 'Vedant Sonawane', role: 'Event Operations Head', image: vedantImg },
        { id: 'ishani-mukewar', name: 'Ishani Mukewar', role: 'Secretary', image: ishaniImg },
        { id: 'jeet-patil', name: 'Jeet Patil', role: 'Technical Head', image: jeetImg },
        { id: 'monish-patil', name: 'Monish Patil', role: 'Creative Head', image: monishImg },
        { id: 'sanskruti-gite', name: 'Sanskruti Gite', role: 'Treasurer', image: sanskrutiImg },
        { id: 'pranita-patil', name: 'Pranita Patil', role: 'Co-Treasurer', image: pranitaImg },
      ],
    },
    {
      id: 'technical',
      title: 'Technical Team',
      members: [
        { id: 'shrimant-marathe', name: 'Shrimant Marathe', role: 'Technical Team', image: shrimantImg },
        { id: 'om-chaudhari', name: 'Om Chaudhari', role: 'Technical Team', image: omcImg },
        { id: 'piyush-shendge', name: 'Piyush Shendge', role: 'Technical Team', image: piyushImg },
        { id: 'rajan-udapure', name: 'Rajan Udapure', role: 'Technical Team', image: rajanImg },
      ],
    },
    {
      id: 'editorial',
      title: 'Editorial Team',
      members: [
        { id: 'disha-kapse', name: 'Disha Kapse', role: 'Editorial Team', image: dishaImg },
        { id: 'madhura-katti', name: 'Madhura Katti', role: 'Editorial Team', image: madhuraImg },
        { id: 'zaweriya-khan', name: 'Zaweriya Khan', role: 'Editorial Team', image: zaweriyaImg },
      ],
    },
    {
      id: 'events',
      title: 'Event Operations Team',
      members: [
        { id: 'atharva-kulkarni', name: 'Atharva Kulkarni', role: 'Event Operations', image: atharvaImg },
        { id: 'om-patil', name: 'Om Patil', role: 'Event Operations', image: omImg },
        { id: 'kshitija-daware', name: 'Kshitija Daware', role: 'Event Operations', image: kshitijaImg },
        { id: 'neha-bhamare', name: 'Neha Bhamare', role: 'Event Operations', image: nehaImg },
        { id: 'parth-waje', name: 'Parth Waje', role: 'Event Operations', image: parthImg },
        { id: 'sahil-batheja', name: 'Sahil Batheja', role: 'Event Operations', image: sahilImg },
      ],
    },
    {
      id: 'creative',
      title: 'Creative Team',
      members: [
        { id: 'riya-sequeira', name: 'Riya Sequeira', role: 'Creative Team', image: riyaImg },
        { id: 'swarada-joshi', name: 'Swarada Joshi', role: 'Creative Team', image: swaradaImg },
        { id: 'shravani-bhagwat', name: 'Shravani Bhagwat', role: 'Creative Team', image: shravaniImg },
        { id: 'prashant-deokar', name: 'Prashant Deokar', role: 'Creative Team', image: prashantImg },
        { id: 'siddharth-wade', name: 'Siddharth Wade', role: 'Creative Team', image: siddharthImg },
      ],
    },
  ],
};
