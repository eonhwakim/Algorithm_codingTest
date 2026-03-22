/**
 * react
 * 1. Feature: Image Carousel
Task Description: Implement interactive Image Carousel for Apartment Details

currently, the apartemnt detail page shows one fixed image per apartment
we want to replace this with a carousel that displays the existing apartment image as the first image,
followed by two placeholder images to demonstrate the carousel functionality
this approach allows us to focus on the carousel implementation without requiring actual multiple images for each apartment

the carousel should provide an intuitive and smooth browsing experience with both manual navigation controls and automatic progression.
Users should be able to navigate through images using previous/next buttons, and the carousel should automatically advance through images with a 3-second pause on each image.
The auto-advance should pause when users hover over the carousel to allow them to examin images more closely.
This is a frontend task focused on enhancing the user interface and user experience of the apartment detail page.
The implementation should be responsive and maitain the exisiting design aesthetic while adding the new carousel functionality.

Note: The placeholder images will be replaced with actual images in future.

Requirement:
- Replace the existing single image display in the apartment detail page component with an interactive carousel.
- The carousel should always show the current apartment's image as the first image.
- Add two palceholder images after the main image to demonstrate carousel functionality.
- Provide support for both mabual and auto navigation with 3-second pause on each image.
- Pause auto-advance when users hover over the carousel and Resueme auto-advance when users move their cursor away from the carousel.
- Ensure the carousel is responsive and works well on different screen sizes.
- Maintain the existing styling and layout of ther apartment detail page.
- The carousel should loop back to the first image after reaching the last image.

Note: Ther code repository may intentionally contain other issues that are unrelated to this specific task, 
please focus only on the described task requirements and address bugs or erros directly associated with them.

Technical Requirements:
- The carousel is also expected to be used in main apartment listing page for each apartment so build accordingly.
- Ensure accessibility features like keyboard navigation and screen reader support.
- Consider performance implications of image loading and carousel transitions.
- Maintain smooth transitions between images without jarring movements for ideal user experience.
- Provide following 'data-testid' attributes to the carousel elements. These are mandatory for automated test case compatibility.

Element | data-testid value
carousel image at index "x" | "carousel-image-x" (eg - carousel-image-1)
carousel previous button | "carousel-btn-prev"
carousel next button | "carousel-btn-next"

 */
