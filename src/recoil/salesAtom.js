import {atom} from "recoil";

export const salesStateAtom = atom({
    key: 'salesStateAtom',
    default: { company: 0, site: 0 , visit: 0 }
})

export const companyAtom = atom({
    key: 'companyAtom',
    default: { 거래처코드: '', 업체명: ''}
});
export const companyListAtom = atom({
    key: 'companyListAtom',
    default: []
});

export const companyDetailAtom = atom({
    key: 'companyDetailAtom',
    default: {}
})
export const siteAtom = atom({
    key: 'siteAtom',
    default: { 현장코드: '', 현장명: ''}
});

export const siteListAtom = atom({
    key: 'siteListAtom',
    default: []
});

export const siteDetailAtom = atom({
    key: 'siteDetailAtom',
    default: {}
});

export const visitListAtom = atom({
    key: 'visitListAtom',
    default: []
});

export const visitDetailAtom = atom({
    key: 'visitDetailAtom',
    default: {}
})
         
export const keywordAtom = atom({
    key: 'keywordAtom',
    default: {
        company:'',
        site:'',
        visit:''

    }
})
       
export const pagingAtom = atom({
    key: 'pagingAtom',
    default: {
       size: 5,
       company: 0, 
       site: 0,
       visit: 0
    }
})
       