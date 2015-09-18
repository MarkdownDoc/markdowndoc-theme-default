
import { Swig } from 'swig';
import swigExtras from 'swig-extras';

const swig = new Swig();
export default swig;

swigExtras.useFilter(swig, 'split');
swigExtras.useFilter(swig, 'trim');
swigExtras.useFilter(swig, 'groupby');
