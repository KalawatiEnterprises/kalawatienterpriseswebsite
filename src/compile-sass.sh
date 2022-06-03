#!/bin/bash

cmd="sass $@"

$cmd styles/brands/brands.scss:../public/css/brands.css &
$cmd styles/categories/categories.scss:../public/css/categories.css &
$cmd styles/contact.scss:../public/css/contact.css &
$cmd styles/homepage.scss:../public/css/homepage.css &
$cmd styles/products/products.scss:../public/css/products.css &
$cmd styles/styles.scss:../public/css/styles.css &
