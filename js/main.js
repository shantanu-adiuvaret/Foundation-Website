(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    dots: false,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });
})(jQuery);

// Code for form that uploaded fils names will show there
const fileInput = document.getElementById("uploadFiles");
const fileList = document.getElementById("fileList");
const uploadedFiles = new Map(); // To track files by name

fileInput.addEventListener("change", function () {
  const files = this.files;

  // Iterate through selected files
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Skip if the file is already added
    if (uploadedFiles.has(file.name)) {
      alert(`The file "${file.name}" is already uploaded.`);
      continue;
    }

    // Add file to the stack
    uploadedFiles.set(file.name, file);

    // Create list item
    const listItem = document.createElement("div");
    listItem.classList.add("d-flex", "align-items-center", "mb-2");
    listItem.setAttribute("data-file-name", file.name);

    // File name
    const fileName = document.createElement("span");
    fileName.textContent = file.name;
    fileName.classList.add("me-auto");

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "×";
    removeButton.classList.add("btn", "btn-sm", "btn-danger", "ms-2");
    removeButton.style.lineHeight = "1";
    removeButton.addEventListener("click", () => {
      // Remove file from the stack
      uploadedFiles.delete(file.name);

      // Remove the list item
      listItem.remove();

      // Show placeholder if no files are left
      if (uploadedFiles.size === 0) {
        fileList.innerHTML = '<p class="text-muted">No files uploaded yet.</p>';
      }
    });

    // Append elements
    listItem.appendChild(fileName);
    listItem.appendChild(removeButton);
    fileList.appendChild(listItem);
  }

  // Clear input value to allow re-uploading the same file
  this.value = "";
});

// NTT Form Validation

