function color(r, g, b) {
  if (r && g && b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (r) {
    return 'rgb(' + r + ',' + r + ',' + r + ')';
  } else {
    return 'rgb(255,255,255)';
  }
}
