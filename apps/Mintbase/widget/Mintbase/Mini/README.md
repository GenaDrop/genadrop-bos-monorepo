# MintBOS Mini Documentation

## Overview

A stipped down version of MintBOS without theming, flexible styling classes, no nav or footer - an easy way for users who want to leverage tools like DAO functionalities and nft minters to build on top of what has been done by MintBOS team.
This guide will help you understand how to add, remove, or modify tabs to create your own preferred version of MintBOS Mini.

## Table of Contents

1. [Application Structure](#application-structure)
2. [Customizing Tabs](#customizing-tabs)
3. [Adding a New Tab](#adding-a-new-tab)
4. [Removing a Tab](#removing-a-tab)
5. [Modifying Existing Tabs](#modifying-existing-tabs)
6. [Best Practices](#best-practices)

## Application Structure

The main component of MintBOS Mini is structured as follows:

- State management for mode, filters, and selected tab
- Styled components for UI elements
- Tab rendering logic
- Content rendering based on selected tab

## Customizing Tabs

The tabs are defined in the `tabs` object:

```javascript
const tabs = {
  labels: [
    { title: "My Owned NFTs" },
    { title: "My Minted NFTs" },
    { title: "My Stores" },
    { title: "Mint NFT" },
    { title: "Store NFTs" },
    { title: "Deploy Store" },
    { title: "My Activity" },
    {
      title: "_DAO NFTs",
      hidden: !connectedDao?.address && !context?.accountId,
    },
  ],
};
```

## Adding a New Tab

To add a new tab:

1. Add a new label to the `labels` array in `tabs`.
2. Create a new case in the `PageContent` component's switch statement.
3. Implement the content for the new tab.

Example:

```javascript
// Step 1: Add new label
const tabProps = {
  labels: [
    // ... existing tabs
    "New Custom Tab",
  ],
};

// Step 2 & 3: Add new case and implement content
const PageContent = () => {
  switch (selectedTab) {
    // ... existing cases
    case "new-custom-tab":
      return (
        <Widget
          src="${config_account}/widget/YourCustomWidget"
          props={{ isDarkModeOn, accountId }}
        />
      );
    // ...
  }
};
```

## Removing a Tab

To remove a tab:

1. Remove the label from the `labels` array in `tabProps`.
2. Remove the corresponding case from the `PageContent` component's switch statement.

## Modifying Existing Tabs

To modify an existing tab:

1. Locate the case for the tab you want to modify in the `PageContent` component.
2. Update the content or props as needed.

Example:

```javascript
case "my-owned-nfts":
  return (
    <Widget
      src={`${config_account}/widget/Mintbase.App.Tokens.Owned`}
      props={{
        isDarkModeOn,
        ownerId: accountId,
        isConnected,
        showFilters: showOwnedFilters,
        onCreateStore,
        // Add or modify props here
        newCustomProp: "value",
      }}
    />
  );
```

## Best Practices

1. Maintain consistency in naming conventions for tab labels and case statements.
2. Ensure that new tabs follow the existing pattern of using Widget components.
3. Test thoroughly after making changes to ensure all functionalities work as expected.
4. Keep the UI responsive by considering mobile views when adding new content.
5. Utilize the `isDarkModeOn` prop for consistent theming across new components.

By following this guide, you can easily customize MintBOS Mini to include the specific functionalities you need for your project.
