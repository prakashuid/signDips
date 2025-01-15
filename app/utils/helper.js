// export function combineItemsByUploadedAt(items) {
//     // Create a map to store signature and captured items by their uploadedAt timestamp
//     const map = {};
  
//     // Iterate over each item in the input array
//     items.forEach(item => {
//       const { uploadedAt, pathname } = item;
  
//       // Ensure that the map has an entry for the current uploadedAt timestamp
//       if (!map[uploadedAt]) {
//         map[uploadedAt] = { uploadedAt };
//       }
  
//       // Depending on the pathname, assign the item to the correct property
//       if (pathname === 'signature.png') {
//         map[uploadedAt].signature = item;
//       } else if (pathname === 'captured.png') {
//         map[uploadedAt].captured = item;
//       }
//     });
  
//     // Filter out entries that don't have both signature and captured items
//     const combinedItems = Object.values(map).filter(
//       entry => entry.signature && entry.captured
//     );
  
//     return combinedItems;
//   }
  
// export function combineItemsByUploadedAt(items) {
//     // Create a map to store signature and captured items by their unique identifiers
//     const map = {};
  
//     // Iterate over each item in the input array
//     items.forEach(item => {
//       const { uploadedAt, url, pathname } = item;
  
//       // Extract the unique identifier from the URL
//       const uniqueIdMatch = url.match(/-(\d+-\d+)\.png$/);
//       if (!uniqueIdMatch) return; // If no match, skip this item
  
//       const uniqueId = uniqueIdMatch[1];
  
//       // Ensure that the map has an entry for the current unique identifier
//       if (!map[uniqueId]) {
//         map[uniqueId] = { uploadedAt };
//       }
  
//       // Depending on the pathname, assign the item to the correct property
//       if (pathname.startsWith('signature')) {
//         map[uniqueId].signature = item;
//       } else if (pathname.startsWith('captured')) {
//         map[uniqueId].captured = item;
//       }
//     });
  
//     // Filter out entries that don't have both signature and captured items
//     const combinedItems = Object.values(map).filter(
//       entry => entry.signature && entry.captured
//     );
  
//     return combinedItems;
//   }
  
export function combineItemsByCoreIdentifier(items) {
    // Create a map to store items by the core part of their pathname
    const map = {};
  
    // Iterate over each item in the input array
    items.forEach(item => {
      const { pathname } = item;
  
      // Remove the "captured-" or "signature-" prefix to get the unique identifier
      const corePathname = pathname.replace(/^(captured-|signature-)/, '');
  
      // Ensure that the map has an entry for the current corePathname
      if (!map[corePathname]) {
        map[corePathname] = {};
      }
  
      // Depending on the original pathname, assign the item to the correct property
      if (pathname.startsWith('signature')) {
        map[corePathname].signature = item;
      } else if (pathname.startsWith('captured')) {
        map[corePathname].captured = item;
      }
    });
  
    // Filter out entries that don't have both signature and captured items
    const combinedItems = Object.values(map).filter(
      entry => entry.signature && entry.captured
    );
    
    combinedItems.sort((a, b) => {
        const dateA = new Date(a.signature.uploadedAt);
        const dateB = new Date(b.signature.uploadedAt);
        return dateB - dateA; // Sort descending
      });
  
    return combinedItems;
  }
 