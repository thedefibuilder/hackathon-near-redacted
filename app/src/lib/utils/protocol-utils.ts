export const getProtocolIcon = (protocolName: string): string => {
  // Convert protocol name to lowercase and remove spaces
  const formattedName = protocolName.toLowerCase().replace(/\s+/g, "-");
  return `https://icons.llamao.fi/icons/protocols/${formattedName}`;
};

export const getChainIcon = (chainName: string): string => {
  // Convert chain name to lowercase and remove spaces
  const formattedName = chainName.toLowerCase().replace(/\s+/g, "-");
  return `https://icons.llamao.fi/icons/chains/rsz_${formattedName}`;
};

// Function to handle image loading errors
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
  const img = event.target as HTMLImageElement;
  img.src = "/fallback-icon.png"; // Make sure to add a fallback icon in your public folder
};
