# Company Logos Implementation Guide

## Logo Assets Needed

To maximize the impact of your enterprise experience, collect and add these company logos to `/public/images/companies/`:

### Fortune 500 Companies (High Priority)
- `sap-logo.png` - SuccessFactors/SAP
- `ea-logo.png` - Electronic Arts/Maxis  
- `oracle-logo.png` - Oracle Corporation
- `prudential-logo.png` - Prudential Investments
- `goldman-sachs-logo.png` - Goldman Sachs (Agency.com client)

### Enterprise Technology Companies
- `guidewire-logo.png` - Guidewire Software
- `support-logic-logo.png` - Support Logic
- `mckesson-logo.png` - McKesson (iKnowMed parent)
- `greatschools-logo.png` - GreatSchools.org
- `agency-com-logo.png` - Agency.com

### Logo Specifications

**File Format**: PNG with transparent background preferred
**Dimensions**: 32x32px to 64x64px (will be displayed at 32px height)
**Quality**: High resolution for retina displays (2x)
**Naming**: Lowercase, hyphen-separated (e.g., `goldman-sachs-logo.png`)

## Implementation Steps

1. **Collect Logos**: Download official logos from company brand assets or use vector versions
2. **Optimize**: Ensure transparent backgrounds and appropriate sizing
3. **Add to Project**: Place in `/public/images/companies/` directory
4. **Update Component**: Uncomment logo paths in the experience data

## Logo Sources

### Official Brand Assets
- SAP: https://www.sap.com/about/legal/trademark.html
- Oracle: https://www.oracle.com/corporate/
- EA: https://www.ea.com/
- Prudential: https://www.prudential.com/

### Alternative Sources (if needed)
- Company Wikipedia pages (often have high-quality logos)
- LinkedIn company pages
- Crunchbase company profiles
- Google Images (filtered for usage rights)

## Fallback Strategy

If logos are unavailable, the component gracefully handles missing logos by:
- Displaying company type icons instead
- Maintaining visual hierarchy through color coding
- Using enterprise badges for credibility

## Brand Compliance

When using company logos:
- Ensure compliance with trademark guidelines
- Use for portfolio/resume purposes (generally acceptable)
- Maintain original proportions and colors
- Don't modify or combine with other elements

## Testing

After adding logos:
1. Check display at different screen sizes
2. Verify transparent backgrounds work correctly  
3. Test loading performance with optimized images
4. Ensure accessibility with proper alt text
