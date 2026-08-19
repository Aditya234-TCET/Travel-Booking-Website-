const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'client', 'src');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We want to pass BOTH currencySymbol and formatPrice so we don't break string usages.
      // But actually, if we just define `formatPrice` in App.jsx and pass it down, we can leave `currencySymbol` as is for places like `Price ({currencySymbol})`.
      
      // Let's replace ONLY the dynamic price usages:
      // {currencySymbol}{price.toLocaleString()} => {formatPrice(price)}
      
      content = content.replace(/\{currencySymbol\}\{([^}]+)\.toLocaleString\(\)\}/g, '{formatPrice($1)}');
      content = content.replace(/\{currencySymbol\}\{([^}]+)\}/g, (match, p1) => {
        if (p1 === 'currencySymbol') return match; // avoid replacing {currencySymbol}{currencySymbol}
        return `{formatPrice(${p1})}`;
      });

      // Now ensure `formatPrice` is accepted as a prop alongside `currencySymbol`
      // Search for `currencySymbol = '₹'` in component props and inject `formatPrice`
      content = content.replace(/currencySymbol = '₹'/g, "currencySymbol = '₹', formatPrice = (v) => '₹'+Number(v).toLocaleString()");

      // Ensure that in components that pass currencySymbol down to children, they also pass formatPrice
      // e.g. <HotelSearch currencySymbol={currencySymbol} /> => <HotelSearch currencySymbol={currencySymbol} formatPrice={formatPrice} />
      content = content.replace(/currencySymbol=\{currencySymbol\}/g, "currencySymbol={currencySymbol} formatPrice={formatPrice}");

      fs.writeFileSync(fullPath, content);
    }
  }
}

processDirectory(srcDir);
