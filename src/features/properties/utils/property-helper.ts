import  { type PropertyModel, RiskLevel } from '../services/models/property-model.ts';


export const getPropertyStatusColor = (riskLevel?: RiskLevel) => {
  switch (riskLevel) {
    case RiskLevel.High:
      return '#e84b27'; // fireRed
    case RiskLevel.Medium:
      return '#edb00d'; // sunYellow
    case RiskLevel.Low:
      return '#5ba0c7'; // waterBlue
    case RiskLevel.None:
      return '#378c36'; // treeGreen
    default:
      // return '#2a403b';
      return '#9e9e9e';
  }
};

export const formatPropertyAddress = (property: PropertyModel) => {
  if (!property.address)
    return undefined;

  return [
    `${property.address.streetNumber?.trim() ?? ''} ${property.address.streetName?.trim() ?? ''}`.trim(),
    property.address.city ?? '',
    property.address.county ?? '',
    property.address.postalCode ?? '',
    property.address.countryName ?? '',
  ]
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .join(', ');
};
