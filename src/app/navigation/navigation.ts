import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            /*
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            */
            {
                id: 'agenda',
                title: 'Agenda',
                translate: 'Configuração da agenda',
                type: 'item',
                icon: 'list-alt',
                url: '/apps/agenda/confAgenda'
            },
            {
                id: 'plano',
                title: 'Plano',
                translate: 'Planos',
                type: 'item',
                icon: 'email',
                url: '/apps/planos/confPlano'
            },
            {
                id: 'exame',
                title: 'Exames',
                translate: 'Exames',
                type: 'item',
                icon: 'accessibility',
                url: '/apps/exames'
            }
        ]
    }
];
