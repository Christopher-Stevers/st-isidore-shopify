import 'dotenv/config';

const SHOPIFY_ADMIN_API_TOKEN = process.env.PRIVATE_ADMIN_API_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN;
const SHOPIFY_API_VERSION = process.env.PRIVATE_ADMIN_API_VERSION || '2024-10';

interface MetafieldDefinition {
  id: string;
  namespace: string;
  key: string;
  name: string;
  description: string;
  type: {
    name: string;
    category: string;
  };
  ownerType: string;
  access: {
    admin: string;
    storefront: string;
  };
}

async function getAllMetafieldDefinitions(): Promise<MetafieldDefinition[]> {
  const query = `
    query {
      metafieldDefinitions(first: 100, ownerType: PRODUCT) {
        nodes {
          id
          namespace
          key
          name
          description
          type {
            name
            category
          }
          ownerType
          access {
            admin
            storefront
          }
        }
      }
    }
  `;

  const shopifyGraphQLUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  console.log('🔍 Fetching all metafield definitions using Admin API...');
  console.log(`📡 Admin API URL: ${shopifyGraphQLUrl}`);
  console.log(`🔑 Using token: ${SHOPIFY_ADMIN_API_TOKEN?.substring(0, 10)}...`);

  try {
    const response = await fetch(shopifyGraphQLUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN!,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('❌ GraphQL errors:', data.errors);
      return [];
    }

    return data.data?.metafieldDefinitions?.nodes || [];
  } catch (error) {
    console.error('❌ Error fetching metafield definitions:', error);
    return [];
  }
}

async function main() {
  console.log('📋 Listing all metafield definitions in your Shopify store...\n');
  
  const metafieldDefinitions = await getAllMetafieldDefinitions();
  
  if (metafieldDefinitions.length === 0) {
    console.log('✅ No metafield definitions found in your store.');
    return;
  }

  console.log(`📊 Found ${metafieldDefinitions.length} metafield definitions:\n`);
  
  // Group by namespace for better organization
  const groupedByNamespace = metafieldDefinitions.reduce((acc, def) => {
    if (!acc[def.namespace]) {
      acc[def.namespace] = [];
    }
    acc[def.namespace].push(def);
    return acc;
  }, {} as Record<string, MetafieldDefinition[]>);

  // Display by namespace
  Object.keys(groupedByNamespace).sort().forEach(namespace => {
    console.log(`📁 Namespace: ${namespace}`);
    console.log('─'.repeat(50));
    
    groupedByNamespace[namespace].forEach(def => {
      console.log(`  🔑 Key: ${def.key}`);
      console.log(`     Name: ${def.name}`);
      console.log(`     Type: ${def.type.name} (${def.type.category})`);
      console.log(`     Description: ${def.description || 'No description'}`);
      console.log(`     Access: Admin=${def.access.admin}, Storefront=${def.access.storefront}`);
      console.log(`     ID: ${def.id}`);
      console.log('');
    });
  });

  console.log(`\n📊 Summary:`);
  console.log(`  📋 Total metafield definitions: ${metafieldDefinitions.length}`);
  console.log(`  📁 Unique namespaces: ${Object.keys(groupedByNamespace).length}`);
  
  // Show access breakdown
  const publicRead = metafieldDefinitions.filter(def => def.access.storefront === 'PUBLIC_READ').length;
  const publicReadWrite = metafieldDefinitions.filter(def => def.access.storefront === 'PUBLIC_READ_WRITE').length;
  const privateAccess = metafieldDefinitions.filter(def => def.access.storefront === 'PRIVATE').length;
  
  console.log(`  🌐 Public Read access: ${publicRead}`);
  console.log(`  ✏️  Public Read/Write access: ${publicReadWrite}`);
  console.log(`  🔒 Private access: ${privateAccess}`);
}

main().catch(console.error);
