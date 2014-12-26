#!/usr/bin/env python
# -*- coding: utf-8 -*-


"""Open Chord Charts Web Site"""


from setuptools import setup, find_packages


doc_lines = __doc__.split('\n')


setup(
    author=u'Christophe Benz',
    author_email=u'contact@openchordcharts.org',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Information Technology',
        'License :: OSI Approved :: GNU Affero General Public License v3',
        'Operating System :: OS Independent',
        'Programming Language :: JavaScript',
        'Programming Language :: Python',
        ],
    description=doc_lines[0],
    entry_points={
        'paste.app_factory': 'main = openchordcharts_web_site.application:make_app',
        },
    install_requires=[
        'Paste',
        ],
    keywords='web api chord chart music contributive',
    license=u'http://www.fsf.org/licensing/licenses/agpl-3.0.html',
    long_description='\n'.join(doc_lines[2:]),
    name=u'OpenChordCharts-Web-Site',
    packages=find_packages(),
    url=u'https://github.com/openchordcharts',
    version='0.2dev',
    zip_safe=False,
    )
