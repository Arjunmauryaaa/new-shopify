# Shopify Admin setup for Health & Personal Care

The theme keeps its current Dawn/AeroFlex styling. The home page now reads from the `health-personal-care` collection, and `product.landing-page` is the short-form ad landing page. Its accelerated checkout button sends the selected product/variant to Shopify checkout; recommendations appear below the product content.

## Before publishing

1. In **Products**, keep only products that belong in Health & Personal Care. Add the correct Shopify product category/type and accurate titles, descriptions, ingredients/materials, directions, warnings, size, and quantity. Do not use unverified health or efficacy claims.
2. Create or update an automated collection called **Health & Personal Care** with handle `health-personal-care`. A simple rule is product tag equals `health-personal-care`; add that tag to each in-scope product. Remove or unpublish products outside this category if the storefront must contain only this category.
3. For each product, upload its real product photos and any product video under **Products → product → Media**. Put a clean product image first; that image can also be used by the home page hero. Replace supplier media only with assets you have permission to use.
4. In **Products → product → Pricing**, set the actual selling price in **Price** and a truthful former/reference price in **Compare-at price** (higher than the selling price). The theme then shows the crossed-out price and sale badge. Set this per variant when prices differ; never invent an MRP or reference price.
5. Assign **product.landing-page** as the theme template to every product used in ads. Use the Products list bulk editor to apply the template to multiple products. Keep other products on the standard template only if they should remain on the storefront.
6. In **Apps → Shopify Search & Discovery → Product recommendations**, add complementary products for each featured product. These populate the **Recommended for your routine** shelf near the bottom of the landing page.
7. Set real shipping rates, return/refund terms, contact details, taxes, and a supported payment provider in **Settings**. Enable accelerated checkout methods if you want Shopify's direct checkout button to show a wallet option; test a real checkout flow before ads go live.
8. In **Content → Menus** (or **Online Store → Navigation**, depending on Admin layout), point the main menu to the Health & Personal Care collection and remove links/categories you no longer sell. Also check footer links and policies.
9. In **Online Store → Themes → Customize**, preview the Home page and each product landing template on desktop and mobile. Confirm the chosen collection, product media, price display, checkout button, and recommendations all look correct.

## Meta ads

For each ad, use the matching product's public product-page URL (the URL shown by Shopify's **View** action), not the checkout URL. The landing page provides product information and the direct checkout button; Shopify checkout is a separate hosted step. Add Meta's campaign/ad tracking parameters to the product URL if you use UTM attribution. Keep the ad's product, price, offer, and claims consistent with the live listing.

## Publish this theme

Upload the contents of this `shopify/` folder as a theme ZIP, or use Shopify CLI from this folder with your store account. Preview the uploaded theme first, then publish it in **Online Store → Themes**. The checkout/payment configuration and product catalog are managed in Admin; they are not included in theme code.
