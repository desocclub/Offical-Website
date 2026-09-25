import type { YearCommittee } from '@/types/committee';

// Faculty & Leadership Images
import bhiseMamImg from '@/src/assets/committee/2026-27/faculty&leadership/bhise-mam.png';
import mrunaliMam2026Img from '@/src/assets/committee/2026-27/faculty&leadership/mrunali-pawar.png';

// Core / Leadership Images
import ishaniImg from '@/src/assets/committee/2026-27/core/ishani-murkewar.png';
import yashImg from '@/src/assets/committee/2026-27/core/yash-kedari.png';
import shravaniBhagwatImg from '@/src/assets/committee/2026-27/core/shravani-bhagwat.png';
import drishtiImg from '@/src/assets/committee/2026-27/core/drishti-lad.png';
import sahilImg from '@/src/assets/committee/2026-27/event-management/sahil-batheja.png';
import shubhamImg from '@/src/assets/committee/2026-27/technical/shubham-chaudhari.png';
import swaradaImg from '@/src/assets/committee/2026-27/design/swarada-joshi.png';
import siddharthImg from '@/src/assets/committee/2026-27/core/siddharth-wade.svg';
import aryaImg from '@/src/assets/committee/2026-27/core/arya-lande.png';

// Event Management Images
import abhilashImg from '@/src/assets/committee/2026-27/event-management/abhilash-chandwadkar.png';
import varadImg from '@/src/assets/committee/2026-27/event-management/varad-pawar.png';
import anujImg from '@/src/assets/committee/2026-27/event-management/anuj-joshi.png';
import anushkaImg from '@/src/assets/committee/2026-27/event-management/anushka-gawali.png';
import arvindImg from '@/src/assets/committee/2026-27/event-management/arvind-jagdhane.png';
import krushnaliImg from '@/src/assets/committee/2026-27/event-management/krushnali-bhandare.png';
import jayeshImg from '@/src/assets/committee/2026-27/event-management/jayesh-patil.png';
import krushnaTaleleImg from '@/src/assets/committee/2026-27/event-management/krushna-talele.png';

// Technical Team Images
import bhushanImg from '@/src/assets/committee/2026-27/technical/bhushan-baskar.png';
import abhinandanImg from '@/src/assets/committee/2026-27/technical/abhinandan-salunke.png';
import achalImg from '@/src/assets/committee/2026-27/technical/achal-raut.png';
import sarthakImg from '@/src/assets/committee/2026-27/technical/sarthak-barhate.png';

// Design Team Images
import harshvardhanImg from '@/src/assets/committee/2026-27/design/harshvardhan-joshi.png';
import shrutikaImg from '@/src/assets/committee/2026-27/design/shrutika-patil.png';
import samikshaImg from '@/src/assets/committee/2026-27/design/samiksha-pawar.png';
import shravaniMahajanImg from '@/src/assets/committee/2026-27/design/shravani-mahajan.png';
import samyakImg from '@/src/assets/committee/2026-27/design/samyak-jain.png';

// Editorial Team Images
import shravaniBarhanpurkarImg from '@/src/assets/committee/2026-27/editorial/shravani-barhanpurkar.png';
import harshadGhigeImg from '@/src/assets/committee/2026-27/editorial/harshad-ghige.png';
import aditiJainImg from '@/src/assets/committee/2026-27/editorial/aditi-jain.png';

// T&P Team Images
import piyushImg from '@/src/assets/committee/2026-27/t&p/piyush-shendge.png';
import zaweriyaImg from '@/src/assets/committee/2026-27/t&p/zaweriya-khan.png';
import harshalImg from '@/src/assets/committee/2026-27/t&p/harshal-zolekar.png';

// GDA Team Images
import anshulImg from '@/src/assets/committee/2026-27/gda/anshul-nandanwar.png';
import narendraImg from '@/src/assets/committee/2026-27/gda/narendra-dambale.png';
import omkarImg from '@/src/assets/committee/2026-27/gda/omkar-chavan.png';

export const committee2026_27: YearCommittee = {
  year: '2026-27',
  label: '2026–27',
  status: 'revealed',
  teams: [
    {
      id: 'faculty',
      title: 'Faculty & Leadership',
      members: [
        { id: 'yd-bhise', name: 'Dr. Prof. Y. D. Bhise', role: 'Department Coordinator', image: bhiseMamImg },
        { id: 'mrunali-pawar', name: 'Prof. Mrunali Pawar', role: 'Faculty Coordinator', image: mrunaliMam2026Img },
      ],
    },
    {
      id: 'core',
      title: 'Core Committee',
      members: [
        { id: 'ishani-mukewar', name: 'Ishani Mukewar', role: 'President', image: ishaniImg },
        { id: 'yash-kedari', name: 'Yash Kedari', role: 'Vice President', image: yashImg },
        { id: 'shravani-bhagwat', name: 'Shravani Bhagwat', role: 'Secretary', image: shravaniBhagwatImg },
        { id: 'drishti-lad', name: 'Drishti Lad', role: 'Joint Secretary', image: drishtiImg },
        { id: 'sahil-batheja', name: 'Sahil Batheja', role: 'Event Head', image: sahilImg },
        { id: 'shubham-chaudhari', name: 'Shubham Chaudhari', role: 'Technical Head', image: shubhamImg },
        { id: 'swarada-joshi', name: 'Swarada Joshi', role: 'Design Head', image: swaradaImg },
        { id: 'siddharth-wade', name: 'Siddharth Wade', role: 'Treasurer', image: siddharthImg },
        { id: 'arya-lande', name: 'Arya Lande', role: 'Co-Treasurer', image: aryaImg },
      ],
    },
    {
      id: 'event-management',
      title: 'Event Management Team',
      members: [
        { id: 'abhilash-chandwankar', name: 'Abhilash Chandwankar', role: 'Event Co-Head', image: abhilashImg },
        { id: 'varad-pawar', name: 'Varad Pawar', role: 'Event Operations', image: varadImg },
        { id: 'anuj-joshi', name: 'Anuj Joshi', role: 'Event Operations', image: anujImg },
        { id: 'anushka-gawali', name: 'Anushka Gawali', role: 'Event Operations', image: anushkaImg },
        { id: 'arvind-jagdhane', name: 'Arvind Jagdhane', role: 'Event Operations', image: arvindImg },
        { id: 'krushnali-bhandare', name: 'Krushnali Bhandare', role: 'Event Operations', image: krushnaliImg },
        { id: 'jayesh-patil', name: 'Jayesh Patil', role: 'Event Operations', image: jayeshImg },
        { id: 'krushna-talele', name: 'Krushna Talele', role: 'Event Operations', image: krushnaTaleleImg },
      ],
    },
    {
      id: 'technical',
      title: 'Technical Team',
      members: [
        { id: 'bhushan-baskar', name: 'Bhushan Baskar', role: 'Technical Co-Head', image: bhushanImg },
        { id: 'abhinandan-salunke', name: 'Abhinandan Salunke', role: 'Technical Team', image: abhinandanImg },
        { id: 'achal-raut', name: 'Achal Raut', role: 'Technical Team', image: achalImg },
        { id: 'sarthak-barhate', name: 'Sarthak Barhate', role: 'Technical Team', image: sarthakImg },
      ],
    },
    {
      id: 'design',
      title: 'Design Team',
      members: [
        { id: 'harshvardhan-joshi', name: 'Harshvardhan Joshi', role: 'Design Co-Head', image: harshvardhanImg },
        { id: 'shrutika-patil', name: 'Shrutika Patil', role: 'Design Team', image: shrutikaImg },
        { id: 'samiksha-pawar', name: 'Samiksha Pawar', role: 'Design Team', image: samikshaImg },
        { id: 'shravani-mahajan', name: 'Shravani Mahajan', role: 'Design Team', image: shravaniMahajanImg },
        { id: 'samyak-jain', name: 'Samyak Jain', role: 'Design Team', image: samyakImg },
      ],
    },
    {
      id: 'editorial',
      title: 'Editorial Team',
      members: [
        { id: 'shravani-barhanpurkar', name: 'Shravani Barhanpurkar', role: 'Editorial Team', image: shravaniBarhanpurkarImg },
        { id: 'harshad-ghige', name: 'Harshad Ghige', role: 'Editorial Team', image: harshadGhigeImg },
        { id: 'aditi-jain', name: 'Aditi Jain', role: 'Editorial Team', image: aditiJainImg },
      ],
    },
    {
      id: 'tp',
      title: 'T&P Team',
      members: [
        { id: 'piyush-shendge', name: 'Piyush Shendge', role: 'T&P Head', image: piyushImg },
        { id: 'zaweriya-khan', name: 'Zaweriya Khan', role: 'T&P Head', image: zaweriyaImg },
        { id: 'harshal-zolekar', name: 'Harshal Zolekar', role: 'T&P Co-Head', image: harshalImg },
      ],
    },
    {
      id: 'gda',
      title: 'GDA Team',
      members: [
        { id: 'anshul-nandanwar', name: 'Anshul Nandanwar', role: 'GDA Head', image: anshulImg },
        { id: 'narendra-dambale', name: 'Narendra Dambale', role: 'GDA Team', image: narendraImg },
        { id: 'omkar-chavan', name: 'Omkar Chavan', role: 'GDA Team', image: omkarImg },
      ],
    },
  ],
};
