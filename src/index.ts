import axios from 'axios';

interface Product {
  name: string;
  domestic: boolean;
  weight?: number;
  price: number;
  description: string;
}

async function getReceipt(): Promise<Product[]> {
  try {
    const { data } = await axios.get(
      'https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      throw error.message;
    } else {
      console.log('unexpected error: ', error);
      throw 'An unexpected error occurred';
    }
  }
}

const receiptData =  await getReceipt();
// console.log('DATA', receiptData)

receiptData.sort((a, b) => a.name.localeCompare(b.name));

const printDomestic = () => {
  console.log('. Domestic')
  receiptData.map(product => {
    if(product.domestic){
      console.log('...', product.name)
      console.log('    Price:', `$${product.price.toFixed(1)}`)
      let truncatedDescription = product.description;
      if(truncatedDescription.length > 10){
        truncatedDescription = truncatedDescription.slice(0, 10) + '...';
      }
      console.log('   ', truncatedDescription)
      if(!product.weight){
        console.log('    Weight: N/A')
      }else {
        console.log('    Weight:', `${product.weight}g`)
      }
    }
  })
}

const printImported = () => {
  console.log('. Imported')
  receiptData.map(product => {
    if(!product.domestic){
      console.log('...', product.name)
      console.log('    Price:', `$${product.price.toFixed(1)}`)
      let truncatedDescription = product.description;
      if(truncatedDescription.length > 10){
        truncatedDescription = truncatedDescription.slice(0, 10) + '...';
      }
      console.log('   ', truncatedDescription)
      if(!product.weight){
        console.log('    Weight: N/A')
      }else {
        console.log('    Weight:', `${product.weight}g`)
      }
    }
  })
}

const printTotalCost = () => {
  let domesticCost: number = 0;
  let importedCost: number = 0;
  
  receiptData.filter(product => product.domestic).map(product => {
    domesticCost +=product.price;
  });
  receiptData.filter(product => !product.domestic).map(product => {
    importedCost +=product.price;
  });
  console.log('Domestic cost: ', '$'+ domesticCost.toFixed(1))
  console.log('Imported cost: ', '$'+ importedCost.toFixed(1))
}

const printPurchasedProductsCount = () => {
  let domesticCount = 0;
  let importedCount = 0;
  receiptData.map(product => {
    product.domestic? domesticCount ++ : importedCount++
  })
  console.log('Domestic count:', domesticCount);
  console.log('Imported count:', importedCount);
}


printDomestic();
printImported();
printTotalCost();
printPurchasedProductsCount();

