# MintBOS Mini Documentation

## Overview

MintBOS Mini is a customizable, single-file stipped down version of MintBOS without theming, flexible styling classes, no nav or footer - an easy way for users who want to leverage tools like DAO functionalities and nft minters to build on top of what has been done by MintBOS team.
This guide will help you understand how to add, remove, or modify tabs to create your own preferred version of MintBOS Mini.

# Comprehensive MintBOS Mini Developer Documentation

## Overview

MintBOS Mini is a customizable, single-file React-based application that provides various functionalities for interacting with the Mintbase ecosystem. This guide will help you understand how to fork, customize, and extend the application to create your own preferred version of MintBOS Mini.

## Table of Contents

1. [File Structure](#file-structure)
2. [Forking and Configuration](#forking-and-configuration)
3. [Application Components](#application-components)
4. [Customizing Tabs](#customizing-tabs)
5. [Adding a New Tab](#adding-a-new-tab)
6. [Removing a Tab](#removing-a-tab)
7. [Modifying Existing Tabs](#modifying-existing-tabs)
8. [Creating Custom Tab Ribbons](#creating-custom-tab-ribbons)
9. [Important Details and Customization Points](#important-details-and-customization-points)
10. [Best Practices](#best-practices)

## File Structure

MintBOS Mini is designed as a single file for easy forking and customization. The file contains all necessary components, styling, and logic for the application.

## Forking and Configuration

To create your own version of MintBOS Mini:

1. Fork the file from its original location.
2. Update the `config_account` variable:
   ```javascript
   // Original
   ${config_account} = "bos.genadrop.near"
   
   // Your custom version
   ${config_account} = "your-account.near"
   ```
3. Customize the components, tabs, and functionality as needed.

## Application Components

The main components of MintBOS Mini include:

- `Root`: The main container component
- `Card`: The styled card component for the application content
- `AppContent`: Styled component for specific app sections
- `FormSection`: Styled component for form sections
- `Toggle`: Component for theme toggling
- `PageContent`: Component that renders content based on selected tab

# Comprehensive MintBOS Mini Developer Documentation

## Customizing Tabs

The tabs are now defined in a `tabs` object with a more complex structure:

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

This new structure allows for more flexibility in defining tabs, including the ability to hide tabs based on certain conditions.

### Tab Properties

- `title`: The display text for the tab
- `hidden`: (Optional) A boolean or expression that determines whether the tab should be hidden

## Adding a New Tab

To add a new tab:

1. Add a new object to the `labels` array in the `tabs` object.
2. If needed, include a `hidden` property to control the tab's visibility.
3. Create a new case in the `PageContent` component's switch statement.
4. Implement the content for the new tab.

Example:

```javascript
// Step 1 & 2: Add new tab object
const tabs = {
  labels: [
    // ... existing tabs
    {
      title: "New Custom Tab",
      hidden: someCondition, // Optional: control visibility
    },
  ],
};

// Step 3 & 4: Add new case and implement content
const PageContent = () => {
  switch (selectedTab) {
    // ... existing cases
    case "New Custom Tab":
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

1. Remove the corresponding object from the `labels` array in the `tabs` object.
2. Remove the corresponding case from the `PageContent` component's switch statement.

## Modifying Existing Tabs

To modify an existing tab:

1. Locate the tab object in the `labels` array of the `tabs` object.
2. Update the `title` or add/modify the `hidden` property as needed.
3. If necessary, update the corresponding case in the `PageContent` component.

Example of modifying a tab's visibility:

```javascript
{
  title: "My Activity",
  hidden: !context.accountId, // Hide this tab if user is not logged in
}
```

## Handling Conditional Tabs

The new structure allows for conditional rendering of tabs. For example, the "_DAO NFTs" tab is hidden unless there's a connected DAO or the user is logged in:

```javascript
{
  title: "_DAO NFTs",
  hidden: !connectedDao?.address && !context?.accountId,
}
```

When working with conditional tabs:

1. Ensure that the conditions for `hidden` are properly defined and tested.
2. Update the conditions if the requirements for showing/hiding the tab change.
3. Remember to handle the case in the `PageContent` component, even if the tab is currently hidden (to support future visibility).

## Important Details and Customization Points

1. **Theme Toggling**: The application supports dark and light modes. Customize the `Toggle` component and `switchChangeHandler` function to adjust theming behavior.

2. **Local Storage**: The application uses local storage for persisting data. Customize the `LOCALSTORAGE_KEY` and related functions to manage your app's state.

3. **Styling**: The application uses styled-components. Customize the styled components (`Root`, `Card`, `AppContent`, etc.) to adjust the look and feel of your app.

4. **Widget Integration**: The application uses a Widget system. When adding new tabs or features, create and integrate new Widgets using the `VM.require` syntax:

   ```javascript
   const { YourWidget } = VM.require("${config_account}/widget/Your.Widget.Path");
   ```

5. **State Management**: The application uses React's `useState` for state management. Consider implementing more robust state management (e.g., Context API or Redux) for more complex applications.

6. **Error Handling**: Implement proper error handling in the `catch` blocks throughout the application to improve user experience and debugging.

7. **Responsive Design**: The application includes some responsive design elements. Ensure that any customizations or new features maintain responsiveness across different device sizes.

## Best Practices

1. Maintain consistency in naming conventions for tab labels and case statements.
2. Ensure that new tabs follow the existing pattern of using Widget components.
3. Test thoroughly after making changes to ensure all functionalities work as expected.
4. Keep the UI responsive by considering mobile views when adding new content.
5. Utilize the `isDarkModeOn` prop for consistent theming across new components.
6. When adding new features, consider their impact on performance and load time.
7. Document any significant changes or additions to help future developers understand your customizations.
8. Regularly update dependencies and check for compatibility with the latest Mintbase ecosystem updates.