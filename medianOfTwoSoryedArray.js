var findMedianSortedArrays = function(nums1, nums2) {
    const arr = nums1.concat(nums2).sort((a, b) => a - b);

    const n = arr.length;

    if (n % 2 === 0) {
        return (arr[n / 2 - 1] + arr[n / 2]) / 2;
    } else {
        return arr[Math.floor(n / 2)];
    }
};