import createClient from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Helper to read .env.local
function getEnv(key) {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const match = envFile.match(new RegExp(`^${key}=(.*)$`, 'm'));
        return match ? match[1].trim() : process.env[key];
    } catch (e) {
        return process.env[key];
    }
}

const projectId = getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
const dataset = getEnv('NEXT_PUBLIC_SANITY_DATASET');
const token = getEnv('NEXT_PUBLIC_SANITY_TOKEN');

if (!projectId || !dataset || !token) {
    console.error('Missing configuration. Please check .env.local');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2023-01-01',
});

const author = {
    _type: 'author',
    name: 'Archit Dasgupta',
    slug: { _type: 'slug', current: 'archit-dasgupta' },
    bio: [
        {
            _type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            children: [
                {
                    _type: 'span',
                    text: 'I am a passionate developer building amazing experiences on the web.',
                },
            ],
        },
    ],
};

const project1 = {
    _type: 'project',
    title: 'E-Commerce Dashboard',
    slug: { _type: 'slug', current: 'e-commerce-dashboard' },
    subTitle: 'A modern dashboard for online stores',
    client: 'Shopify Inc',
    designers: [
        {
            _key: 'd1',
            name: 'Jane Doe',
            url: 'https://janedoe.design',
        },
    ],
    links: [
        {
            _key: 'l1',
            text: 'View Live',
            url: 'https://example.com',
        },
    ],
    body: [
        {
            _type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            children: [
                {
                    _type: 'span',
                    text: 'This project involved creating a comprehensive dashboard for managing sales and inventory.',
                },
            ],
        },
    ],
    color1: {
        _type: 'color',
        hex: '#4A90E2',
        alpha: 1,
    },
};

const project2 = {
    _type: 'project',
    title: 'Portfolio 2024',
    slug: { _type: 'slug', current: 'portfolio-2024' },
    subTitle: 'My personal portfolio website',
    client: 'Me',
    designers: [
        {
            _key: 'd2',
            name: 'Archit Dasgupta',
        },
    ],
    links: [
        {
            _key: 'l2',
            text: 'GitHub Repo',
            url: 'https://github.com/Archit-Dasgupta/portfolio-site',
        },
    ],
    body: [
        {
            _type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            children: [
                {
                    _type: 'span',
                    text: 'A showcase of my work and skills, built with Next.js and Sanity.',
                },
            ],
        },
    ],
    color1: {
        _type: 'color',
        hex: '#F5A623',
        alpha: 1,
    },
};

async function seed() {
    console.log('Seeding data...');

    try {
        const authorRes = await client.createOrReplace({ _id: 'author-archit', ...author });
        console.log('Created Author:', authorRes._id);

        const p1Res = await client.createOrReplace({ _id: 'project-ecommerce', ...project1 });
        console.log('Created Project 1:', p1Res._id);

        const p2Res = await client.createOrReplace({ _id: 'project-portfolio', ...project2 });
        console.log('Created Project 2:', p2Res._id);

        console.log('Seeding complete!');
    } catch (err) {
        console.error('Seeding failed:', err);
    }
}

seed();
