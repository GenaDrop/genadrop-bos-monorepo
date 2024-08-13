# Welcome to MintBOS

After forking this repo, use some of the guides below to help you customize our code to meet your specific needs

## SDK Guide!

### Overview

This guide provides a comprehensive list of all the functionalities available on Mintbase and demonstrates how to use them. It includes detailed examples of importing, using, and calling these functionalities within your project.

### Example Function: Transfer Store Ownership

This example illustrates how to transfer ownership of a store on Mintbase using the `transferStoreOwnership` function.
This is just an example to

#### Importing the Function

To use the `transferStoreOwnership` function, you need to import it from the SDK. Here’s how you can do it:

```js
const { transferStoreOwnership } = VM.require(
  "${config_account}/widget/Mintbase.utils.sdk"
);
```

#### Calling the Function

Once the function is imported, you can call it by passing the required parameters. In this example, the function is called within the `onSign` method, which is triggered by a user action, such as clicking a button. you could also add validations when calling the method and error checks

```js
const onSign = () => {
  transferStoreOwnership(contractId, transferAccountName);
};
```

#### Base Function Implementation

Below is the base implementation of the `transferStoreOwnership` function. This function takes the current contract name and the new owner's account name as parameters and performs the ownership transfer.

```js
function transferStoreOwnership(contractName, newOwner) {
  const deposit = 1;
  try {
    return Near.call([
      {
        contractName,
        args: {
          new_owner: newOwner,
          keep_old_minters: true,
        },
        methodName: "transfer_store_ownership",
        deposit,
        gas: GAS,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}
```

### Detailed Explanation

1.  **Importing the Function**: The function is imported using the `VM.require` method. Replace `${config_account}` with the appropriate configuration account path.
2.  **Calling the Function**: The `onSign` method demonstrates how to call the `transferStoreOwnership` function. The `contractId` and `transferAccountName` are the parameters required by the function, representing the current contract's name and the new owner's account name, respectively.
3.  **Function Implementation**:

    - **Parameters**: The `transferStoreOwnership` function takes two parameters: `contractName` (the name of the current contract) and `newOwner` (the new owner's account name).
    - **Deposit**: A deposit of 1 NEAR token is specified for the transaction.
    - **Near.call**: The function uses `Near.call` to make the contract call. It includes the contract name, the method name (`transfer_store_ownership`), and the required arguments (`new_owner` and `keep_old_minters`). The `deposit` and `gas` are also specified.
    - **Error Handling**: If an error occurs during the call, it is logged to the console or you could add custom handling.

This example serves as a **template** for using other **functionalities** provided by the Mintbase SDK. Follow similar steps to import, call, and handle other functions as needed.

## Mintbase NFT Method!

A huge part of the mintbos is ability to carry out mintbase functionalities on NFTS. NFT methods which includes `minting, listing, delisting, buying, burning, and multiplying` of NFTs, all of which could be easly called as function. Defined in the `{NAME}/widget/NFT.modules` file. An example shown below, the listing method

### Listing Method

Listing involves two contracts call: one for deposit `storage_deposit` and `nft_approve` to list.
This method has the following required parameters.

- `contractAddress`: which is the address of the contract.
- `tokenIds`: the token ids of the NFT, could be one or more (multiple listing).
- `mainnet`: if this is true, it lists to mainnet and if false, testnet.
- `listAmount`: amount of available multiples to be listed.
- `ft`: usdt or usdc list type (optional).

```js
/**
 * The function `listNFT` lists NFTs for sale on a marketplace contract, handling different scenarios
 * based on parameters such as contract address, token IDs, price, and fungible token.
 * @returns The `listNFT` function returns the result of calling the `Near.call` function with an array
 * of objects containing contract information for depositing storage and listing NFTs. If an error
 * occurs during the process, the function catches the error and logs it to the console.
 */

const listNFT = (contractAddress, tokenIds, mainnet, price, listAmount, ft) => {
  const storageDeposit = listAmount * 1e22;
  if (!contractAddress) return;
  if (tokenIds.length < 1) return;

  const gas = 2.25e14;
  // const storageDeposit = 1e22;
  let msg = { price: _price(price) };
  let optionalDeposit = [];

  if (ft) {
    // Listing to USDT and USDC Contracts
    const ftContractId = ftContracts[ft].mainnet;
    msg.ft_contract = ftContractId;
    msg.price = `${Number(price) * 1000000}`;

    // Extra Deposit
    optionalDeposit.push({
      contractName: ftContracts[ft].mainnet,
      methodName: "storage_deposit",
      args: {
        registration_only: true,
      },
      gas: gas,
      deposit: `1250${"0".repeat(18)}`,
    });
  }

  const ids = tokenIds.slice(0, listAmount).map((data) => ({
    contractName: contractAddress,
    args: {
      token_id: data,
      account_id: mainnet
        ? MARKET_CONTRACT_ADDRESS.mainnet
        : MARKET_CONTRACT_ADDRESS.testnet,
      msg: JSON.stringify(msg),
    },
    methodName: "nft_approve",
    deposit: listAmount > 1 ? `9300${"0".repeat(18)}` : LISTING_DEPOSIT,
    gas: GAS,
  }));

  try {
    return Near.call([
      {
        contractName: mainnet
          ? MARKET_CONTRACT_ADDRESS.mainnet
          : MARKET_CONTRACT_ADDRESS.testnet,
        methodName: "deposit_storage",
        args: {
          autotransfer: true,
        },
        gas: gas,
        deposit: storageDeposit.toString(),
      },
      ...optionalDeposit,
      ...ids,
    ]);
  } catch (error) {
    console.log(error);
  }
};
```

## DAOs on Mintbase!

### Overview

This page provides a user interface for searching and displaying Decentralized Autonomous Organizations (DAOs) on the Mintbase platform. The primary functionality includes searching for DAOs based on user input and displaying the results as cards, which contain detailed information about each DAO. The page is styled to support both dark and light modes for better user experience.

### DAO Card Component

The `DAOCard` component is responsible for rendering individual DAO details. It displays information such as the DAO's name, the number of owned NFTs, the number of members, and the number of proposals.

```js
const { DAOCard } = VM.require(
  "${config_account}/widget/Mintbase.App.DAOs.DAOCard"
) || {
  DAOCard: () => <></>,
};
```

### MintDAOs Component

The `MintDAOs` component manages the state and logic for searching and displaying DAOs. It fetches the DAOs based on the user's search input and displays them using the `DAOCard` component. The cards have a green (connected user belongs to the DAO) and red (connected user does not belong to the DAO) indicator.

## Usage

To use this page, simply include the `MintDAOs` component in your application. It will handle the search functionality and display the DAO cards based on the user's input. The component also supports dark mode, which can be toggled using the `isDarkModeOn` prop.

## Conclusion

This page provides a seamless way for users to search for and explore DAOs on the Mintbase platform. The integration of styled components and asynchronous data fetching

## Mintbase DAO Methods!

Mintbase DAO (Decentralized Autonomous Organization) methods allow users to interact with the Mintbase platform in a decentralized and community-driven manner. These methods enable the creation of proposals, voting, and execution of various actions related to NFTs and their associated smart contracts. One of the key methods is `listAsADao`, which facilitates listing NFTs as part of a DAO proposal.

#### List of Actions You can carry out as a DAO

- List NFT as a DAO
- Mint NFT as a DAO
- Deploy Store as DAO
- Buy NFT as a DAO

### List NFT as a DAO Method

The `listAsADao` method allows a DAO to propose and execute the listing of NFTs on the Mintbase marketplace. This function requires several parameters including the DAO ID, contract address, token IDs, mainnet flag, price, list amount, and an optional fungible token (ft). Here is the implementation of the `listAsADao` method:- `contractAddress`: which is the address of the contract.

```js
const listAsADao = (
  daoId,
  contractAddress,
  tokenIds,
  mainnet,
  price,
  listAmount,
  ft
) => {
  if (!contractAddress) return;
  if (tokenIds.length < 1) return;

  const gas = 2.25e14;
  let msg = { price: _price(price) };

  const ids = tokenIds.slice(0, listAmount).map((data) => ({
    token_id: data,
    account_id: mainnet
      ? MARKET_CONTRACT_ADDRESS.mainnet
      : MARKET_CONTRACT_ADDRESS.testnet,
    msg: JSON.stringify(msg),
  }));

  return Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `A Proposal for Deposit on Listing`,
          kind: {
            FunctionCall: {
              receiver_id: mainnet
                ? MARKET_CONTRACT_ADDRESS.mainnet
                : MARKET_CONTRACT_ADDRESS.testnet,
              actions: [
                {
                  method_name: "deposit_storage",
                  args: fc_args(
                    JSON.stringify({
                      autotransfer: true,
                    })
                  ),
                  gas: gas?.toString(),
                  deposit: "10000000000000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: 100000000000000000000000,
      gas: 200000000000000,
    },
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `A Proposal to List this NFT on Mintbase`,
          kind: {
            FunctionCall: {
              receiver_id: contractAddress,
              actions: [
                {
                  method_name: "nft_approve",
                  args: fc_args(JSON.stringify(...ids)),
                  deposit:
                    listAmount > 1 ? `9300${"0".repeat(18)}` : LISTING_DEPOSIT,
                  gas: GAS,
                },
              ],
            },
          },
        },
      },
      deposit: 100000000000000000000000,
      gas: 200000000000000,
    },
  ]);
};
```

In this example, the method first checks if the contract address and token IDs are valid. It then constructs a message with the specified price and maps the token IDs to the appropriate contract and account IDs based on the network (mainnet or testnet). The method prepares two proposals for the DAO: one for depositing storage and another for listing the NFTs. These proposals are then submitted to the DAO using the `Near.call` function, ensuring that the actions are executed if the proposals are approved by the DAO members.

### Deploy Store as a DAO Method

The `deployStoreAsADao` method allows a DAO to propose and execute the creation of a new store on the Mintbase platform. This function requires several parameters including the DAO ID, store name, store symbol, reference, reference hash, network flag (isMainnet), and account ID. Here is the implementation of the `deployStoreAsADao` method:

```js
const deployStoreAsADao = ({
  daoId,
  storeName,
  storeSymbol,
  reference,
  referenceHash,
  isMainnet,
  accountId,
}) => {
  const base_uri = "https://arweave.net";
  const isSignedin = !!accountId;
  console.log("isSignedin", context);
  const gas = 2e14;
  const deposit = 65e23;
  if (!isSignedin) return console.log("sign in first");
  if (!storeName || !storeSymbol) {
    return console.log("missing store name or symbol");
  }
  try {
    return Near.call([
      {
        contractName: daoId,
        methodName: "add_proposal",
        args: {
          proposal: {
            description: `A Proposal to Create a Store on Mintbase`,
            kind: {
              FunctionCall: {
                receiver_id: isMainnet
                  ? "mintbase1.near"
                  : "mintspace2.testnet",
                actions: [
                  {
                    method_name: "create_store",
                    args: fc_args(
                      JSON.stringify({
                        owner_id: daoId,
                        metadata: {
                          name: storeName,
                          spec: spec,
                          symbol: storeSymbol,
                          base_uri,
                          ...(reference && { reference }),
                          ...(referenceHash && {
                            reference_hash: referenceHash,
                          }),
                        },
                      })
                    ),
                    deposit: convertScientificToNormal(deposit),
                    gas: convertScientificToNormal(gas),
                  },
                ],
              },
            },
          },
        },
        deposit: 100000000000000000000000,
        gas: 200000000000000,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
```

In this example, the method first checks if the user is signed in and if the store name and symbol are provided. It then constructs the necessary parameters for creating the store, including metadata such as the store name, symbol, and optional references. The method prepares a proposal for the DAO to create the store and submits it using the `Near.call` function. If the proposal is approved by the DAO members, the store will be created on the Mintbase platform.

These DAO methods exemplify how decentralized governance and community involvement can be integrated into the operations of NFT marketplaces like Mintbase. By utilizing these methods, users can participate in the decision-making process and contribute to the growth and development of the platform.
