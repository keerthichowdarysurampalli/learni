import folderClosed from '@iconify/icons-fa6-solid/folder-closed';
import filePdf from '@iconify/icons-fa6-solid/file-pdf'; import fileIcon from '@iconify/icons-fa6-solid/file';

import fileVideo from '@iconify/icons-fa6-solid/file-video';

import fileZipper from '@iconify/icons-fa6-solid/file-zipper';
import filePowerpoint from '@iconify/icons-fa6-solid/file-powerpoint';
import fileExcel from '@iconify/icons-fa6-solid/file-excel';
import fileImage from '@iconify/icons-fa6-solid/file-image';

export const FileIcons = Object.freeze({
    'FOLDER': folderClosed,
    'FILE': fileIcon,
    'PDF': filePdf,
    'VIDEO': fileVideo,
    'ZIP': fileZipper,
    'IMAGE': fileImage,
    'PNG': fileImage,
    'PPTX': filePowerpoint,
    'JPG': fileImage,
    'XLSX': fileExcel,
});

/**
 * @param {string} type
 */
export function getIconByType(type) {
    switch (type) {
        case 'FOLDER':
            return FileIcons.FOLDER;
        case 'PDF':
            return FileIcons.PDF;
        case 'VIDEO':
            return FileIcons.VIDEO;
        case 'ZIP':
            return FileIcons.ZIP;
        case 'IMAGE':
        case 'PNG':
        case 'JPG':
            return FileIcons.IMAGE;
        case 'PPTX':
            return FileIcons.PPTX;
        case 'XLSX':
            return FileIcons.XLSX;
        default:
            return FileIcons.FILE;
    }
}
