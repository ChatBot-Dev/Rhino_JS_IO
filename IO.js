(function () {
    function IO() { }

    IO.prototype.write = ((path, str) => {
        let _BufferedOutputStream;
        try {
            _BufferedOutputStream = new java.io.BufferedOutputStream(new java.io.FileOutputStream(path));
            _BufferedOutputStream.write(new java.lang.String(str).getBytes());
            return true;
        } catch (e) {
            return e;
        } finally {
            _BufferedOutputStream.close();
        }
    });

    IO.prototype.read = ((path) => {
        let _BufferedReader;
        try {
            let line, result, _StringBuffer = new java.lang.StringBuffer;
            _BufferedReader = new java.io.BufferedReader(new java.io.FileReader(new java.io.File(path)));
            while ((line = _BufferedReader.readLine()) != null) _StringBuffer.append(line + '\n');
            result = _StringBuffer.toString().split('\n');
            result.pop()
            result = result.join('\n');
            return result;
        } catch (e) {
            return e;
        } finally {
            _BufferedReader.close();
        }
    });

    Io.prototype.delete = ((path) => {
        let _File = new java.io.File(path);
        try {
            if (_File.exists()) {
                if (_File.isFile()) {
                    _File.delete();
                    return true;
                }
                let list = _File.listFiles();
                for (let n = 0; n < list.length; n++) {
                    if (list[n].isFile()) {
                        list[n].delete();
                    } else {
                        module.exports.delete(list[n].getPath());
                    }
                    list[n].delete();
                }
                _File.delete();
            }
            return true;
        } catch (e) {
            return e;
        }
    });

    IO.prototype.mkdir = ((path) => {
        try {
            java.io.File(path).mkdirs();
            return true;
        } catch (e) {
            return e;
        }
    });

    return IO;
})();
