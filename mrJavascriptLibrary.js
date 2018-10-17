function color(r, g, b) {
  if (arguments.length == 3) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (arguments.length == 1) {
    return 'rgb(' + r + ',' + r + ',' + r + ')';
  } else {
    return 'rgb(255,255,255)';
  }
}
