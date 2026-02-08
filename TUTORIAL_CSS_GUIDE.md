# Tutorial CSS Classes Guide

This document shows which CSS classes need to be added to each page to enable tutorials.

## ✅ Completed Pages

### Dashboard Page
- `.overview-cards` - Overview statistics cards
- `.period-selector` - Time period filter
- `.spending-trends-chart` - Spending trends visualization
- `.top-merchants-chart` - Top merchants visualization

### Emails Page
- `.email-filters` - Email filter controls
- `.email-list` - Email table/list
- `.classification-badge` - Classification status badges

---

## 📋 Remaining Pages

### Extraction Candidates Page
**Tutorial Steps Defined:** 5 steps
**CSS Classes Needed:**
1. `.candidate-filters` - Filter controls (status, type, date, merchant, amount)
2. `.bulk-select-checkbox` - Checkbox for bulk selection
3. `.bulk-action-toolbar` - Bulk confirm/reject toolbar
4. `.confidence-meter` - AI confidence display
5. `.candidate-review-button` - Review/edit button

**Implementation:**
```tsx
// Add import
import { useAutoStartTutorial } from '../hooks/use-auto-start-tutorial';

// In component
useAutoStartTutorial('extraction-candidates');

// Add CSS classes to elements
<div className="candidate-filters">
  {/* Filter components */}
</div>

<input type="checkbox" className="bulk-select-checkbox" />

<div className="bulk-action-toolbar">
  {/* Bulk actions */}
</div>

<div className="confidence-meter">
  {/* Confidence display */}
</div>

<button className="candidate-review-button">
  Review
</button>
```

---

### Financial Records Page
**Tutorial Steps Defined:** 4 steps
**CSS Classes Needed:**
1. `.record-filters` - Advanced filter controls (8 filters)
2. `.record-list` - Financial records table/list
3. `.record-detail-button` - View details button
4. `.sort-controls` - Sorting controls

**Implementation:**
```tsx
// Add import
import { useAutoStartTutorial } from '../hooks/use-auto-start-tutorial';

// In component
useAutoStartTutorial('financial-records');

// Add CSS classes
<div className="record-filters">
  {/* Filter components */}
</div>

<div className="record-list">
  {/* Records table */}
</div>

<button className="record-detail-button">
  View Details
</button>

<div className="sort-controls">
  {/* Sort dropdowns */}
</div>
```

---

### Processing Page
**Tutorial Steps Defined:** 4 steps
**CSS Classes Needed:**
1. `.classification-section` - Classification job trigger section
2. `.extraction-section` - Extraction job trigger section
3. `.batch-size-input` - Batch size input field
4. `.progress-indicator` - Job progress display

**Implementation:**
```tsx
// Add import
import { useAutoStartTutorial } from '../hooks/use-auto-start-tutorial';

// In component
useAutoStartTutorial('processing');

// Add CSS classes
<div className="classification-section">
  {/* Classification controls */}
</div>

<div className="extraction-section">
  {/* Extraction controls */}
</div>

<input className="batch-size-input" />

<div className="progress-indicator">
  {/* Progress bars */}
</div>
```

---

### Rules Page
**Tutorial Steps Defined:** 4 steps
**CSS Classes Needed:**
1. `.create-rule-button` - Create new rule button
2. `.rule-card` - Individual rule cards
3. `.rule-conditions` - Rule condition inputs
4. `.rule-actions` - Rule action selectors

**Implementation:**
```tsx
// Add import
import { useAutoStartTutorial } from '../hooks/use-auto-start-tutorial';

// In component
useAutoStartTutorial('rules');

// Add CSS classes
<button className="create-rule-button">
  Create Rule
</button>

<div className="rule-card">
  {/* Rule display */}
</div>

<div className="rule-conditions">
  {/* Condition inputs */}
</div>

<div className="rule-actions">
  {/* Action selectors */}
</div>
```

---

### Settings Page
**Tutorial Steps Defined:** 3 steps
**CSS Classes Needed:**
1. `.profile-section` - User profile section
2. `.gmail-sync-section` - Gmail sync controls
3. `.api-keys-section` - API key management

**Implementation:**
```tsx
// Add import
import { useAutoStartTutorial } from '../hooks/use-auto-start-tutorial';

// In component
useAutoStartTutorial('settings');

// Add CSS classes
<div className="profile-section">
  {/* Profile info */}
</div>

<div className="gmail-sync-section">
  {/* Gmail sync */}
</div>

<div className="api-keys-section">
  {/* API keys */}
</div>
```

---

## Quick Implementation Checklist

For each page:
1. ✅ Import `useAutoStartTutorial` hook
2. ✅ Call `useAutoStartTutorial('page-name')` at top of component
3. ✅ Add CSS class names to target elements
4. ✅ Test tutorial flow
5. ✅ Verify all steps highlight correctly

## Testing

After adding CSS classes:
1. Clear localStorage: `localStorage.clear()`
2. Navigate to the page
3. Verify tutorial auto-starts
4. Click through all steps
5. Verify each element highlights correctly
6. Check responsive behavior on mobile

## Notes

- CSS class names should match exactly what's in `tutorials.ts`
- Classes can be added to existing divs or wrap elements in new divs
- Auto-start only triggers on first visit (tracked in localStorage)
- Help button appears on all pages with tutorials
