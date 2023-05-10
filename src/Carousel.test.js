import { render, fireEvent, queryByTestId } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import React from "react";

// Smoke test
it("renders without crashing", function () {
  const photos = [{ TEST_IMAGES }];
  const title = "sample carousel"
  render(<Carousel photos={photos} title={title} />);
});

// Snapshot test
it("matches snapshot", function () {
  const photos = [{ TEST_IMAGES }];
  const title = "sample carousel"
  const { asFragment } = render(<Carousel photos={photos} title={title} />);
  expect(asFragment()).toMatchSnapshot();
});

// // Bug test 1
it("clicking left arrow moves to previous image", function () {
  const photos = [{ src: 'photo1.jpg', caption: 'Photo 1' },
  { src: 'photo2.jpg', caption: 'Photo 2' },
  { src: 'photo3.jpg', caption: 'Photo 3' }];
  const title = "sample carousel"
  const { getByTestId, queryByTestId } = render(<Carousel photos={photos} title={title} />);

  fireEvent.click(getByTestId("right-arrow"));
  fireEvent.click(getByTestId("right-arrow"));

  fireEvent.click(getByTestId("left-arrow"));

  const currCardIdx = Number(queryByTestId("card").getAttribute("data-curr-card-idx"));
  const currImage = getByTestId("card").querySelector(".Card-image");

  expect(currImage.getAttribute("src")).toEqual(photos[currCardIdx].src);

});

// Arrow test
test("left arrow should be missing on first image and right arrow should be missing on last image", function () {
  const photos = [{ src: 'photo1.jpg', caption: 'Photo 1' },
  { src: 'photo2.jpg', caption: 'Photo 2' },
  { src: 'photo3.jpg', caption: 'Photo 3' },];
  const title = "sample carousel"
  const { getByTestId, queryByTestId } = render(<Carousel photos={photos} title={title} />);

  // Check that left arrow is missing on first image
  expect(queryByTestId("left-arrow")).toBeNull();

  // Move to the next image
  fireEvent.click(getByTestId("right-arrow"));

  //Check that the left arrow is now also in the document
  expect(getByTestId("left-arrow")).toBeInTheDocument();

  // Move to last image
  fireEvent.click(getByTestId("right-arrow"));

  // Check that right arrow is missing on last image
  expect(queryByTestId("right-arrow")).toBeNull();
});


it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
