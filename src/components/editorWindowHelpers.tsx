export const SAMPLE_SCRIPT = `# ExampleCo Home Solutions – Sample Call Script

You're a customer service representative speaking on the phone.

---

## Steps:

1. Ask for **first and last name**.

2. Ask for **full property address**.

3. Confirm the address back, saying:
   - Street numbers and ZIP code individually.
   - e.g., "401st Street" → _"four hundred first street"_

4. Ask:  
   _"And that is the home you own and live at?"_

5. Ask:  
   _"And what type of home is it — single family, condo, townhome, mobile, or rental?"_

6. Ask:  
   _"Great! We also ask to meet with all owners of the property. Who would that be?"_

7. Say:  
   _"This will be a full replacement including frame and installation. We don't perform repairs or glass-only replacements."_

8. Ask how many **[units]** they want replaced (e.g., windows or doors).

9. Ask what issues they're experiencing with those **[units]**.

10. Say:  
    _"A Project Specialist will inspect, measure, and provide a quote valid for 12 months. Does that sound helpful?"_

11. Ask:  
    _"We ask that you set aside about 90 minutes for the visit. Fair enough?"_

12. Ask for **best email address**.

13. Ask:  
    _"Would daytime or evening work better for your schedule?"_

14. Offer appointment based on their preference (e.g., 2 P M or 6 P M).

15. Then:  
    <% function abc12345-def6-7890-ghij-klmnopqrstuv %>

---

## If Caller Is Not Interested:

End with:  
<% function xyz98765-wxyz-4321-lmno-pqrstuvwxyza %>`;


export const preprocessMarkdown = (markdown: string): string => {
	return markdown
		.replace(/<% function ([a-zA-Z0-9-]+) %>/g, (_, id) => {
			return `<function-badge id="${id}"></function-badge>`
		})
		.replace(/<u>(.*?)<\/u>/g, (_, text) => {
			return `<u>${text}</u>`
		})
};

export const postprocessMarkdown = (htmlLikeMarkdown: string): string => {
	return htmlLikeMarkdown
		.replace(/<function-badge id="(.*?)"><\/function-badge>/g, (_, id) => {
			return `<% function ${id} %>`
		})
		.replace(/<u>(.*?)<\/u>/g, (_, text) => {
			return `<u>${text}</u>`
		})
};