$(document).ready(function () {
  // ----get data---
  $.ajax({
    method: "GET",
    url: "https://fakestoreapi.com/products",
    dataType: "json",

    success: function (data) {
      $.map(data, function (data, i) {
        $(".our-product-section").append(
          "<div class='product-container'><p id='" +
            data.id +
            "'>" +
            "</p><img src=" +
            data.image +
            " /><div class='price-rating'><p>" +
            data.title +
            "</p><p>Rs. " +
            data.price +
            "</p></div></div>"
        );
      });
    },
    error: function () {
      $("#display-msg").html("Couldn't fetch the list of product");
    },
  });

  // ----add data----
  var $price = $("#price");
  var $image = $("#image");
  var $title = $("#title");
  var $product = $("#product");

  $("#add-newProduct").on("click", function () {
    $(".add-product-container-body").removeClass("close");
    $(".add-product-container").removeClass("close");
  });
  $("#close-btn").on("click", function () {
    $(".add-product-container-body").addClass("close");
    $(".add-product-container").addClass("close");
  });

  $("#add-product").on("click", function () {
    var product = {
      price: $price.val(),
      image: $image.val(),
      title: $title.val(),
    };
    $.ajax({
      method: "POST",
      url: "https://fakestoreapi.com/products",
      data: product,
      success: function (post) {
        $(".our-product-section").append(
          "<div class='product-container'><img src=" +
            post.image +
            " /><div class='price-rating'><p>" +
            post.title +
            "</p><p>Rs. " +
            post.price +
            "</p></div></div>"
        );
        $(".add-product-container-body").addClass("close");
      },
      error: function () {
        $("#display-msg").html("error in add product");
      },
    });
  });
  // ---delete function---
  var editImage, editTitle, editPrice, value;

  $("#deleteProduct").on("click", function () {
    $(".delete-product-container-body").removeClass("close");
    $(".delete-product-container").removeClass("close");
  });
  $("#delete-close").on("click", function () {
    $(".delete-product-container-body").addClass("close");
    $(".delete-product-container").addClass("close");
  });

  $("#product-id").keypress(function () {
    value = $("#product-id").val();
    console.log(value);

    $product.delegate("#delete-data-btn", "click", function (data) {
      $("#" + value)
        .parent()
        .remove();
      $(".delete-product-container-body").addClass("close");
    });

    // $product.delegate("#delete-data-btn", "click", function (data) {
    //   $.ajax({
    //     method: "DELETE",
    //     url: `https://fakestoreapi.com/products/+${value}`,
    //     dataType: "json",
    //     success: function () {
    //       $("#display-msg").html("Successfully Deleted..");
    //       $(".delete-product-container-body").addClass("close");
    //     },
    //     error: function () {
    //       $("#display-msg").html("Couldn't delete the product");
    //     },
    //   });
    // });
  });
  // Edit Product function
  $("#editProduct").on("click", function () {
    $(".edit-product-container-body").removeClass("close");
    $(".edit-product-container").removeClass("close");
  });
  $("#edit-close").on("click", function () {
    $(".edit-product-container-body").addClass("close");
    $(".edit-product-container").addClass("close");
  });

  $("#item-id").keypress(function () {
    value = $("#item-id").val();
    console.log(value);
  });

  $("#edit-data-btn").on("click", function () {
    $(".edit-product").removeClass("close");
    $(".edit-product-container").removeClass("close");
    $(".edit-product-container-body").addClass("close");
  });

  $("#edit-image").keypress(function () {
    editImage = $("#edit-image").val();
    console.log(value);
  });
  $("#edit-title").keypress(function () {
    editTitle = $("#edit-title").val();
    console.log(value);
  });
  $("#edit-price").keypress(function () {
    editPrice = $("#edit-price").val();
    console.log(value);
  });
  $(".cancle-btn").on("click", function () {
    $(".edit-product").addClass("close");
  });

  $product.delegate(".save-btn", "click", function (data) {
    $("#" + value)
      .parent()
      .html(
        "<p id=" +
          value +
          '></p><img src="' +
          editImage +
          '"><div class="price-rating"><p>' +
          editTitle +
          "</p><p>" +
          editPrice +
          "</p></div>"
      );
    $(".edit-product").addClass("close");
  });

  // $product.delegate(".save-btn", "click", function (data) {
  //   $.ajax({
  //     method: "PUT",
  //     url: `https://fakestoreapi.com/products/+${value}`,
  //     dataType: "json",
  //     body: JSON.stringify({
  //       title: `${editTitle}`,
  //       price: `${editPrice}`,
  //       image: `${editImage}`,
  //     }),
  //     success: function () {
  //       $("#display-msg").html("Successfully Updated..");
  //       $(".edit-product").addClass("close");
  //     },
  //     error: function () {
  //       $("#display-msg").html("Unable to update the product Detail");
  //     },
  //   });
  // });
});
